// api/unity-app/Assets/Scripts/MainMenu.cs

using UnityEngine;
using UnityEngine.SceneManagement;

public class MainMenu : MonoBehaviour
{
    // Esta función será llamada por el botón "Jugar"
    public void StartGame()
    {
        // Reinicia el cerrojo estático para permitir que la próxima partida guarde su puntaje
        ResultManager.ResetScoreSentFlag();
        
        SceneManager.LoadScene("MathGameScene");
    }
}