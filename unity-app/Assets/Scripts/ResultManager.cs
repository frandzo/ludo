using UnityEngine;
using TMPro;
using UnityEngine.Networking;
using System.Collections;
using System.Text;

public class ResultManager : MonoBehaviour
{
    public TextMeshProUGUI resultText;
    public TextMeshProUGUI statusText;
    public string apiBaseUrl = "http://localhost:3000"; // configurar según ambiente
    public int maxRetries = 3;
    public float retryDelayBase = 1.0f;

    void Start()
    {
        int finalScore = PlayerPrefs.GetInt("finalScore", 0);
        string userId = PlayerPrefs.GetString("userIdentifier", "guest");
        if (resultText != null) resultText.text = $"Tu puntaje: {finalScore}";
        if (statusText != null) statusText.text = "Enviando puntaje...";

        StartCoroutine(SendScoreWithRetries(userId, finalScore));
    }

    IEnumerator SendScoreWithRetries(string userId, int score)
    {
        int attempt = 0;
        bool success = false;
        while (attempt < maxRetries && !success)
        {
            attempt++;
            yield return StartCoroutine(SendScore(userId, score, (ok, msg) =>
            {
                success = ok;
                if (statusText != null) statusText.text = msg;
            }));

            if (!success)
            {
                float wait = retryDelayBase * Mathf.Pow(2, attempt - 1);
                if (statusText != null) statusText.text = $"Reintentando en {wait} s (intento {attempt}/{maxRetries})";
                yield return new WaitForSeconds(wait);
            }
        }

        if (!success && statusText != null)
            statusText.text = "No se pudo enviar el puntaje. Se guardó localmente.";
    }

    IEnumerator SendScore(string userId, int score, System.Action<bool,string> callback)
    {
        string url = apiBaseUrl + "/api/juegos_usuarios";
        ScorePayload payload = new ScorePayload { email = userId, score = score };
        string json = JsonUtility.ToJson(payload);

        using (UnityWebRequest req = new UnityWebRequest(url, "POST"))
        {
            byte[] body = Encoding.UTF8.GetBytes(json);
            req.uploadHandler = new UploadHandlerRaw(body);
            req.downloadHandler = new DownloadHandlerBuffer();
            req.SetRequestHeader("Content-Type", "application/json");

#if UNITY_2020_1_OR_NEWER
            yield return req.SendWebRequest();
            if (req.result == UnityWebRequest.Result.ConnectionError || req.result == UnityWebRequest.Result.ProtocolError)
#else
            yield return req.SendWebRequest();
            if (req.isNetworkError || req.isHttpError)
#endif
            {
                Debug.LogError($"Error al enviar: {req.error} | Code: {req.responseCode}");
                callback(false, $"Error: {req.error}");
            }
            else
            {
                Debug.Log("Puntaje enviado OK: " + req.downloadHandler.text);
                callback(true, "Puntaje enviado correctamente ✅");
            }
        }
    }

    [System.Serializable]
    public class ScorePayload
    {
        public string email;
        public int score;
    }
}
