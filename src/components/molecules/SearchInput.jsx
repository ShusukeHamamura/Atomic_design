import styled from "styled-components";
import { memo, useState } from "react";
import { useHistory } from "react-router-dom";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { Input } from "../atoms/input/Input";

export const SearchInput = memo(() => {
  const [searchVal, setSearchVal] = useState("");
  const onChageInput = (event) => {
    setSearchVal(event.target.value);
  };

  const history = useHistory();
  const onClickSearch = () => {
    history.push(`/users?name=${searchVal}`);
  };

  return (
    <SContainer>
      <Input
        placeholder="検索条件を入力"
        onChange={onChageInput}
        value={searchVal}
      />
      <SButtonWrapper>
        <PrimaryButton onClick={onClickSearch}>検索</PrimaryButton>
      </SButtonWrapper>
    </SContainer>
  );
});

const SContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SButtonWrapper = styled.div`
  padding-left: 8px;
`;
