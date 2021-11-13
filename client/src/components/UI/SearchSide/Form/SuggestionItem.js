import React from "react";
import SuggestionLi from "../../../common/SuggestionLi";
import Text from "../../../common/Text";
export default function SuggestionItem(props) {
  return (
    <SuggestionLi onClick={props.selectHandler(props.value)}>
      <Text fontSize="1.6rem" textAlign="center" padding="0 0 0 5%">
        {props.text.main_text} {props.text_secondary_text}
      </Text>
    </SuggestionLi>
  );
}
