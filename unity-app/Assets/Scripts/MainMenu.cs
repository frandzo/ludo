// Assets/Scripts/MainMenu.cs

using UnityEngine;
using UnityEngine.SceneManagement;

public class MainMenu : MonoBehaviour
{
    // esta función será llamada por el botón "jugar"
    public void StartGame()
    {
        SceneManager.LoadScene("MathGameScene");
    }
}