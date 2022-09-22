// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import ReactStars from "react-stars";
// import styled from "styled-components";
// import axios from "axios";
// import moment from "moment";
// import List from "@mui/material/List";
// import Icon from "../../icon/user.svg";
// import useFirebaseAuth from "../../auth/useFirebaseAuth";

// const FriendList = () => {
//   const [viewingList, setViewingList] = useState();
//   const { userId } = useFirebaseAuth();

//   useEffect(() => {
//     axios({
//       method: "GET",
//       url: `${
//         process.env.REACT_APP_BACKEND_API || "http://localhost:8080/"
//       }friend/friend-list`,
//       params: { userId },
//     }).then((res) => {
//       setViewingList(res.data);
//     });
//   }, [userId]);

//   return (
//     <Wrapper>
//       <AddFriendArea>
//         <Link to="/add-friend">
//           <TransitionAddFriend>フレンドの追加</TransitionAddFriend>
//         </Link>
//       </AddFriendArea>
//       <StyledList>
//         {viewingList &&
//           viewingList.map((viewingAnime) => (
//             <ListItem alignItems="flex-start">
//               <div>
//                 <UserIcon src={Icon} />
//                 <FriendName>{viewingAnime.name}</FriendName>
//               </div>

//               <ListContent>
//                 <UpperRowContent>
//                   <Title>{viewingAnime.title}</Title>
//                   <ViewingApp>at {viewingAnime.viewing_app}</ViewingApp>
//                   <p>
//                     {moment(viewingAnime.date).format("YYYY年M月D日H時mm分")}
//                   </p>
//                 </UpperRowContent>
//                 <LowerRowContent>
//                   <StoryNum>第{viewingAnime.story_number}話</StoryNum>
//                   <SubTitle>{viewingAnime.sub_title}</SubTitle>
//                   <ReactStars
//                     size={24}
//                     edit={false}
//                     value={viewingAnime.rating}
//                   ></ReactStars>
//                 </LowerRowContent>
//               </ListContent>
//             </ListItem>
//           ))}
//       </StyledList>
//     </Wrapper>
//   );
// };

// const Wrapper = styled.div`
//   width: 100%;
//   max-width: 700;
// `;
// const AddFriendArea = styled.div`
//   margin-right: 50px;
//   text-align: right;
// `;
// const TransitionAddFriend = styled.button`
//   height: 56px;
//   width: 200px;
//   border: none;
//   border-radius: 6px;
//   background-color: green;
//   color: white;
// `;
// const StyledList = styled(List)`
//   width: 100%;
// `;
// const ListItem = styled.div`
//   display: flex;
//   width: 90%;
//   margin: 30px auto 30px auto;
//   border: solid #efeaea;
//   border-radius: 1em;
// `;
// const UserIcon = styled.img`
//   height: 70px;
//   width: 70px;
//   margin: auto 30px auto 30px;
//   border-radius: 50%;
// `;
// const FriendName = styled.p`
//   width: 20%;
//   margin: auto 30px auto 30px;
// `;
// const ListContent = styled.div`
//   width: 90%;
//   margin-left: 10px;
// `;
// const UpperRowContent = styled.div`
//   display: flex;
//   margin: 0;
// `;
// const Title = styled.p`
//   width: 40%;
//   font-weight: bold;
//   font-size: 20px;
// `;

// const ViewingApp = styled.p`
//   width: 30%;
// `;
// const LowerRowContent = styled.div`
//   display: flex;
//   margin: 0;
// `;
// const StoryNum = styled.p`
//   width: 10%;
// `;
// const SubTitle = styled.p`
//   width: 60%;
// `;

// export default FriendList;
