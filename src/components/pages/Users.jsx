import styled from "styled-components";
import { SearchInput } from "../molecules/SearchInput";
import { UserCard } from "../organisms/user/UserCard";
import { useLocation } from "react-router-dom";
import { SecondaryButton } from "../atoms/button/SecondaryButton";
import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { useRecoilState } from "recoil";
import { userState } from "../../store/userState";
import axios from "axios";

const users = [];
axios
  .get("https://jsonplaceholder.typicode.com/users")
  .then((res) => {
    users.push(...res.data);
  })
  .catch((err) => {
    console.log(err);
  });

// const users = [...Array(10).keys()].map((val) => {
//   return {
//     id: val,
//     name: `はま${val}`,
//     image: "https://source.unsplash.com/7GX5aICb5i4",
//     email: "111@aaa.com",
//     phone: "000-9999-8888",
//     company: {
//       name: "株式会社あああ"
//     },
//     website: "https://google.com"
//   };
// });

export const Users = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const query_name = query.get("name");

  // const { userInfo, setUserInfo } = useContext(UserContext);
  const [userInfo, setUserInfo] = useRecoilState(userState);

  const onClickSwitch = () => {
    setUserInfo({ isAdmin: !userInfo.isAdmin });
  };

  return (
    <SContainer>
      <h2>ユーザー一覧</h2>
      <SearchInput />
      <br />
      <SecondaryButton onClick={onClickSwitch}>切り替え</SecondaryButton>
      <SUserArea>
        {/* if分を用いた表示 */}
        {(() => {
          if (query_name === null || query_name === "") {
            return users.map((user) => {
              return <UserCard key={user.id} user={user}></UserCard>;
            });
          } else if (query_name < users.length) {
            return (
              <UserCard key={query_name} user={users[query_name]}></UserCard>
            );
          } else {
            return users.map((user) => {
              return <UserCard key={user.id} user={user}></UserCard>;
            });
          }
        })()}

        {/* 3項演算子を用いた表示 */}
        {/* {query_name === null ||
        query_name === "" ||
        query_name > users.length ? (
          users.map((user) => {
            return <UserCard key={user.id} user={user}></UserCard>;
          })
        ) : (
          <UserCard key={query_name} user={users[query_name]}></UserCard>
        )} */}
      </SUserArea>
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const SUserArea = styled.div`
  padding-top: 40px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
`;
