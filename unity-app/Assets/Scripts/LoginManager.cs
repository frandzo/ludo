using UnityEngine;
using TMPro;
using UnityEngine.SceneManagement;
using System.Text.RegularExpressions;

public class LoginManager : MonoBehaviour
{
    public TMP_InputField emailInput;
    public TMP_Text warningText;

    private void Start()
    {
        if (warningText != null) warningText.text = "";
    }

    public void OnLoginButton()
    {
        string email = emailInput.text.Trim();

        if (!IsValidEmail(email))
        {
            if (warningText != null) warningText.text = "Ingrese un correo válido.";
            Debug.LogWarning("Email inválido: " + email);
            return;
        }

        PlayerPrefs.SetString("userIdentifier", email); // clave general: puede ser email u otro id
        PlayerPrefs.Save();
        SceneManager.LoadScene("MathGameScene");
    }

    bool IsValidEmail(string email)
    {
        if (string.IsNullOrEmpty(email)) return false;
        string pattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
        return Regex.IsMatch(email, pattern);
    }
}
