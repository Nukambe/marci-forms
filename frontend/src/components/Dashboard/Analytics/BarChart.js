import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

// wrap label at max length
const splitLabel = (label, max) => {
  const split = label.split(" ");
  let i = 0;
  let currentLine = "";
  const lines = [];

  while (i < split.length) {
    currentLine += split[i] + " ";

    if (currentLine.length + (split[i + 1]?.length || max) + 1 > max) {
      lines.push(currentLine);
      currentLine = "";
    }

    i++;
  }

  return lines;
};

export default function BarChart({ form, submissions }) {
  Chart.defaults.font.size = 16;

  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const questionAnswers = form.questions
      .filter((q) => q.type === 2) // only radios
      .map((q) => ({
        id: q.id,
        text: q.text,
        totals: q.options.map((option) => ({ option: option, total: 0 })),
      }));

    const answers = submissions.map((submission) =>
      submission.answers.filter(
        (
          answer // only radios
        ) => questionAnswers.map((qa) => qa.id).includes(answer.questionId)
      )
    );

    answers.forEach((submission) => {
      submission.forEach((answer) => {
        questionAnswers
          .find((qa) => qa.id === answer.questionId) // match submission to question
          .totals.find((total) => total.option === answer.value).total++; // increase total for answer
      });
    });

    const options = [];
    questionAnswers.forEach((qa) => {
      qa.totals.forEach((total) => {
        if (!options.includes(total.option)) {
          options.push(total.option);
        }
      });
    });

    questionAnswers.data = questionAnswers.map((qa) => {
      const qaData = {};
      qaData.x = qa.text;
      qa.totals.forEach((total) => {
        qaData[total.option] = total.total;
      });
      return qaData;
    });

    const labels = questionAnswers.map((qa) => qa.text);

    const datasets = options.map((option) => {
      return {
        label: option,
        data: questionAnswers.data,
        borderWidth: 1,
        parsing: {
          yAxisKey: option,
        },
      };
    });

    setData({ labels, datasets });
  }, [form, submissions]);

  return (
    <Bar
      data={data}
      options={{
        skipNull: true,
        responsive: true,
        scales: {
          // wrap labels
          x: {
            ticks: {
              callback: function (value) {
                const label = this.getLabelForValue(value);
                return splitLabel(label, 24);
              },
            },
          },
        },
      }}
      className="mt-4 pb-8"
    />
  );
}
