// Assets/Scripts/LoginManager.cs

using UnityEngine;
using UnityEngine.SceneManagement;

public class LoginManager : MonoBehaviour
{
    // clase auxiliar para deserializar los datos que vienen del frontend
    [System.Serializable]
    private class AuthData
    {
        public string token;
        public string gameId;
    }

    // función llamada desde JavaScript en el navegador
    // recibe un string en formato JSON: {"token": "...", "gameId": "..."}
    public void StartGameWithData(string jsonData)
    {
        if (string.IsNullOrEmpty(jsonData))
        {
            Debug.LogError("No se recibieron datos (token/gameId). El juego no puede continuar.");
            return;
        }

        AuthData data = JsonUtility.FromJson<AuthData>(jsonData);

        if (string.IsNullOrEmpty(data.token) || string.IsNullOrEmpty(data.gameId))
        {
            Debug.LogError("El token o el gameId están vacíos. Revisa los datos enviados desde el frontend.");
            return;
        }
        
        // guardar ambos datos para usarlos en el juego y al final
        PlayerPrefs.SetString("jwtToken", data.token);
        PlayerPrefs.SetString("currentGameId", data.gameId);
        PlayerPrefs.Save();
        
        Debug.Log($"Token y Game ID ({data.gameId}) recibidos y guardados. Iniciando el juego...");
        SceneManager.LoadScene("MainMenuScene");
    }
}