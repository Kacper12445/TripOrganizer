import React from "react";
import SuggestionLi from "../../../common/SuggestionLi";
import Text from "../../../common/Text";
export default function SuggestionItem(props) {
  return (
    <SuggestionLi onClick={props.selectHandler(props.value)}>
      <Text fontSize="20px">
        {props.text.main_text}, {props.text_secondary_text}
      </Text>
    </SuggestionLi>
  );
}
