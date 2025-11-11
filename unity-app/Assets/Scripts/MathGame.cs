using UnityEngine;
using TMPro;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class MathGame : MonoBehaviour
{
    [Header("UI")]
    public TextMeshProUGUI questionText;
    public Button[] answerButtons;
    public TextMeshProUGUI scoreText;
    public TextMeshProUGUI timerText;
    public int totalQuestions = 10;
    public float timePerQuestion = 10f;

    private int correctAnswer;
    private int score = 0;
    private int questionsAsked = 0;
    private float timer;
    private bool questionActive;

    void Start()
    {
        score = 0;
        questionsAsked = 0;
        if (scoreText != null) scoreText.text = $"Puntaje: {score}";
        NextQuestion();
    }

    void Update()
    {
        if (!questionActive) return;

        timer -= Time.deltaTime;
        if (timerText != null) timerText.text = $"Tiempo: {Mathf.Ceil(timer)}s";

        if (timer <= 0)
        {
            // tiempo cumplido = pregunta fallada
            questionActive = false;
            Invoke(nameof(NextQuestion), 0.5f);
        }
    }

    void NextQuestion()
    {
        if (questionsAsked >= totalQuestions)
        {
            PlayerPrefs.SetInt("finalScore", score);
            PlayerPrefs.Save();
            SceneManager.LoadScene("ResultScene");
            return;
        }

        questionsAsked++;
        GenerateOperation();
        timer = timePerQuestion;
        questionActive = true;
    }

    void GenerateOperation()
    {
        int level = 1 + (questionsAsked / 4); // cada 4 preguntas sube nivel
        int max = 9 * level + 1;

        int a = Random.Range(1, max);
        int b = Random.Range(1, max);

        correctAnswer = a + b;
        if (questionText != null) questionText.text = $"{a} + {b} = ?";

        int correctIndex = Random.Range(0, answerButtons.Length);

        for (int i = 0; i < answerButtons.Length; i++)
        {
            int value;
            if (i == correctIndex)
                value = correctAnswer;
            else
            {
                do
                {
                    int delta = Random.Range(-3 * level, 4 * level);
                    value = correctAnswer + delta;
                } while (value == correctAnswer);
            }

            if (answerButtons[i] != null)
            {
                var txt = answerButtons[i].GetComponentInChildren<TextMeshProUGUI>();
                if (txt != null) txt.text = value.ToString();

                int capturedValue = value;
                answerButtons[i].onClick.RemoveAllListeners();
                answerButtons[i].onClick.AddListener(() => OnAnswerClicked(capturedValue));
            }
        }
    }

    void OnAnswerClicked(int selected)
    {
        if (!questionActive) return;
        questionActive = false;

        if (selected == correctAnswer)
        {
            score += 10;
            if (scoreText != null) scoreText.text = $"Puntaje: {score}";
        }

        Invoke(nameof(NextQuestion), 0.5f);
    }
}
