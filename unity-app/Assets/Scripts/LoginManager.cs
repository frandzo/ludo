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
        // limpiar datos de sesión anteriores por seguridad
        PlayerPrefs.DeleteKey("jwtToken");
        PlayerPrefs.DeleteKey("currentGameId");

        if (!string.IsNullOrEmpty(jsonData))
        {
            try
            {
                AuthData data = JsonUtility.FromJson<AuthData>(jsonData);
                if (!string.IsNullOrEmpty(data.token) && !string.IsNullOrEmpty(data.gameId))
                {
                    PlayerPrefs.SetString("jwtToken", data.token);
                    PlayerPrefs.SetString("currentGameId", data.gameId);
                    PlayerPrefs.Save();
                    Debug.Log("Datos de sesión recibidos y guardados. Jugador autenticado.");
                }
                else
                {
                    Debug.Log("Datos recibidos pero incompletos. Jugando como visitante.");
                }
            }
            catch (System.Exception e)
            {
                Debug.LogWarning($"Error al procesar JSON: {e.Message}. Jugando como visitante.");
            }
        }
        else
        {
            Debug.Log("No se recibieron datos de sesión. Jugando como visitante.");
        }
        
        SceneManager.LoadScene("MainMenuScene");
    }
}