// api/unity-app/Assets/Scripts/ResultManager.cs

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

    // Cerrojo estático: se comparte entre todas las posibles instancias
    // Garantiza que el código de envío solo se ejecute UNA VEZ
    private static bool hasScoreBeenSent = false;

    void Start()
    {
        // Si el cerrojo está cerrado (el puntaje ya se envió), no hacer nada
        if (hasScoreBeenSent)
        {
            Debug.LogWarning("Se intentó ejecutar ResultManager de nuevo. Petición abortada por el cerrojo estático.");
            return;
        }
        
        // Si el cerrojo está abierto, lo cerramos INMEDIATAMENTE
        hasScoreBeenSent = true;

        // Verificamos si hay un puntaje válido para enviar
        if (!PlayerPrefs.HasKey("finalScore"))
        {
            Debug.LogWarning("No se encontró 'finalScore' en PlayerPrefs. Abortando.");
            return;
        }

        // Leemos y borramos la clave para evitar relecturas
        int finalScore = PlayerPrefs.GetInt("finalScore");
        PlayerPrefs.DeleteKey("finalScore");
        PlayerPrefs.Save();

        if (resultText != null) resultText.text = $"Tu puntaje: {finalScore}";

        string token = PlayerPrefs.GetString("jwtToken", null);
        if (!string.IsNullOrEmpty(token))
        {
            // Usuario autenticado: enviar puntaje al backend
            StartCoroutine(PostScore(finalScore));
        }
        else
        {
            // Visitante: notificar al frontend directamente
            if (statusText != null) statusText.text = "¡Partida finalizada!";
            Application.ExternalCall("handleGameCompleted", finalScore);
        }
    }

    // Método público para que otras partes del juego (como el menú) puedan reiniciar el cerrojo
    public static void ResetScoreSentFlag()
    {
        hasScoreBeenSent = false;
        Debug.Log("Cerrojo de envío de puntaje reiniciado para una nueva partida.");
    }

    IEnumerator PostScore(int score)
    {
        if (statusText != null) statusText.text = "Enviando puntaje...";

        string token = PlayerPrefs.GetString("jwtToken", null);
        string gameId = PlayerPrefs.GetString("currentGameId", null);

        if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(gameId))
        {
            if (statusText != null) statusText.text = "Error de autenticación.";
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