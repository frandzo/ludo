// Assets/Scripts/ResultManager.cs

using UnityEngine;
using TMPro;
using UnityEngine.Networking;
using System.Collections;
using System.Text;

public class ResultManager : MonoBehaviour
{
    public TextMeshProUGUI resultText;
    public TextMeshProUGUI statusText;
    public string apiBaseUrl = "http://localhost:3000";

    void Start()
    {
        int finalScore = PlayerPrefs.GetInt("finalScore", 0);
        if (resultText != null) resultText.text = $"Tu puntaje: {finalScore}";

        string token = PlayerPrefs.GetString("jwtToken", null);

        if (!string.IsNullOrEmpty(token))
        {
            // si hay token, enviar puntaje al backend
            StartCoroutine(PostScore(finalScore));
        }
        else
        {
            // si no hay token, notificar directamente al frontend
            if (statusText != null) statusText.text = "¡Partida finalizada!";
            Debug.Log("Jugador visitante. Notificando al frontend sin guardar puntaje.");
            Application.ExternalCall("handleGameCompleted", finalScore);
        }
    }

    IEnumerator PostScore(int score)
    {
        if (statusText != null) statusText.text = "Enviando puntaje...";

        string token = PlayerPrefs.GetString("jwtToken", null);
        string gameId = PlayerPrefs.GetString("currentGameId", null); // obtener ID dinámico

        if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(gameId))
        {
            if (statusText != null) statusText.text = "Error: Faltan datos de autenticación o del juego.";
            Debug.LogError("No se encontró el token JWT o el gameId.");
            yield break;
        }

        string url = $"{apiBaseUrl}/api/juegos/completar";

        ScorePayload payload = new ScorePayload { juegoId = gameId, puntaje = score };
        string jsonPayload = JsonUtility.ToJson(payload);
        byte[] bodyRaw = Encoding.UTF8.GetBytes(jsonPayload);

        using (UnityWebRequest request = new UnityWebRequest(url, "POST"))
        {
            request.uploadHandler = new UploadHandlerRaw(bodyRaw);
            request.downloadHandler = new DownloadHandlerBuffer();
            request.SetRequestHeader("Content-Type", "application/json");
            request.SetRequestHeader("Authorization", $"Bearer {token}");

            yield return request.SendWebRequest();

            if (request.result != UnityWebRequest.Result.Success)
            {
                Debug.LogError($"Error al enviar puntaje: {request.error} | {request.downloadHandler.text}");
                if (statusText != null) statusText.text = "Error al guardar el puntaje.";
            }
            else
            {
                Debug.Log("Puntaje enviado con éxito!");
                if (statusText != null) statusText.text = "¡Puntaje guardado!";
                // llamar a la función de JS para notificar al frontend que puede continuar
                Application.ExternalCall("handleGameCompleted", score);
            }
        }
    }

    [System.Serializable]
    private class ScorePayload
    {
        public string juegoId;
        public int puntaje;
    }
}
