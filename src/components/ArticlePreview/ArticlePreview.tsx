import { Image } from "antd";
import { format } from "date-fns";
import { FC, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

import userImage from "../../assets/user.jpg";
import { IArticle } from "../../types/IArticle";
import { truncateText } from "../../utils/text";
import Button from "../UI/Button/Button";
import FavoritesCount from "../FavoritesCount/FavoritesCount";
import Popup from "../Popup/Popup";
import { useAuth } from "../../hooks/hooks";
import {
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} from "../../services/BlogService";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const TitleWrap = styled.div`
  display: flex;
  margin-right: 6px;
`;

const Title = styled.h5`
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #1890ff;
  margin-bottom: 4px;
  margin-right: 13px;
  word-break: break-all;
`;

const Link = styled(RouterLink)`
  &:hover {
    text-decoration: underline;
  }
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0;
`;

const Tag = styled.li`
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: rgba(0, 0, 0, 0.5);
  padding: 2px 5px 3px;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  border-radius: 2px;
  margin-bottom: 2px;

  margin-right: 8px;

  &:last-child {
    margin-right: 0;
  }
`;

const Info = styled.div`
  display: flex;

  @media screen and (max-width: 480px) {
    order: -1;
    justify-content: space-between;

    margin-bottom: 5px;
  }
`;

const InfoLeft = styled.div`
  margin-right: 12px;
  text-align: right;

  @media screen and (max-width: 480px) {
    text-align: left;
  }
`;

const UserName = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.85);
`;

const UserImage = styled(Image)`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const CreatedDate = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: rgba(0, 0, 0, 0.5);
`;

const Body = styled.div`
  display: flex;
  height: 100%;
  min-height: 45px;
  justify-content: space-between;
`;

const Text = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.75);
  margin-bottom: 0;
  width: 70%;
`;

const Controls = styled.div<{ show?: boolean }>`
  margin-top: auto;
  display: none;

  ${(props) => (props.show ? "display: flex;" : "")}
`;

const ControlButton = styled(Button).attrs({ size: "medium" })`
  margin-right: 12px;

  &:last-child {
    margin-right: 0;
  }
`;

const ButtonWrap = styled.div`
  position: relative;
`;

const DeletePopup = styled(Popup)`
  top: 0;
  left: calc(100% - 4px);
  width: 240px;
`;

export interface ArticlePreviewProps {
  data: IArticle;
  showControls?: boolean;
  full?: boolean;
  onEdit?: () => unknown | Promise<unknown>;
  onDelete?: () => unknown | Promise<unknown>;
}

const ArticlePreview: FC<ArticlePreviewProps> = ({
  data,
  showControls,
  full,
  onEdit,
  onDelete,
}) => {
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [articleData, setArticleData] = useState<IArticle>(data);

  const [favoriteArticle] = useFavoriteArticleMutation();
  const [unfavoriteArticle] = useUnfavoriteArticleMutation();

  const deleteHandler = () => {
    setShowPopup(true);
  };

  const editHandler = () => {
    if (onEdit) {
      onEdit();
    }
  };

  const onDecline = () => {
    setShowPopup(false);
  };

  const onAccept = () => {
    if (onDelete) {
      onDelete();
    }

    setShowPopup(false);
  };

  const onFavorite = async () => {
    if (!user) return;

    const { token } = user;
    const { slug } = articleData;

    let req:
      | ReturnType<typeof favoriteArticle>
      | ReturnType<typeof unfavoriteArticle>;
    if (!articleData.favorited) {
      req = favoriteArticle({ token, slug });
    } else {
      req = unfavoriteArticle({ token, slug });
    }

    const res = await req;
    if ("data" in res) {
      setArticleData(res.data.article);
    }
  };

  const text = useMemo(
    () =>
      !full ? truncateText(data.description, 80, "...") : data.description,
    [articleData.description]
  );

  const date = useMemo(
    () => format(new Date(articleData.createdAt), "MMMM dd, yyyy"),
    [articleData.createdAt]
  );

  return (
    <>
      <Header>
        <div>
          <TitleWrap>
            <Title>
              <Link to={`/articles/${articleData.slug}`}>
                {articleData.title}
              </Link>
            </Title>
            <FavoritesCount
              count={articleData.favoritesCount}
              disabled={!user}
              active={articleData.favorited}
              onFavorite={onFavorite}
            />
          </TitleWrap>
          <TagList>
            {articleData.tagList.map((tag, i) => {
              // in case there are two or more tags with the same name
              const key = `${tag}-${i}`;
              return <Tag key={key}>{tag}</Tag>;
            })}
          </TagList>
        </div>
        <Info>
          <InfoLeft>
            <UserName>{articleData.author.username}</UserName>
            <CreatedDate>{date}</CreatedDate>
          </InfoLeft>
          <UserImage
            src={articleData.author.image}
            alt="User image"
            fallback={userImage}
            preview={false}
          />
        </Info>
      </Header>
      <Body>
        <Text>{text}</Text>
        <Controls show={showControls}>
          <ButtonWrap>
            <ControlButton onClick={deleteHandler} color="#F5222D">
              Delete
            </ControlButton>
            <DeletePopup
              text="Are you sure to delete this article?"
              onDecline={onDecline}
              onAccept={onAccept}
              show={showPopup}
            />
          </ButtonWrap>
          <ControlButton onClick={editHandler} color="#52C41A">
            Edit
          </ControlButton>
        </Controls>
      </Body>
    </>
  );
};

export default ArticlePreview;
