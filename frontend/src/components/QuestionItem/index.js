import TextInput from "../Forms/TextInput";
import RadioCardInput from "../Forms/RadioCardInput";

export default function QuestionItem({ question, changeAnswers }) {
  switch (question.type) {
    case 1:
      return (
        <TextInput
          key={question.id}
          question={question}
          changeAnswers={changeAnswers}
          inputType="text"
        />
      );
    case 2:
      return (
        <RadioCardInput
          key={question.id}
          question={question}
          changeAnswers={changeAnswers}
        />
      );
    case 3:
      return (
        <TextInput
          key={question.id}
          question={question}
          changeAnswers={changeAnswers}
          inputType="number"
        />
      );
    case 4:
      return (
        <TextInput
          key={question.id}
          question={question}
          changeAnswers={changeAnswers}
          inputType="datetime-local"
        />
      );
    default:
      return <div key={question.id}>Invalid...</div>;
  }
}
