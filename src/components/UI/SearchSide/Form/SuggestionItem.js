import React from "react";
import Card from "../../../common/Card";
import Text from "../../../common/Text";
export default function SuggestionItem(props) {
  return (
    <Card>
      <Text>
        {props.text.main_text}, {props.text_secondary_text}
      </Text>
    </Card>
  );
}
