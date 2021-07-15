import React, { useEffect } from 'react';
import styled from 'styled-components';

// redux & api
import { useDispatch, useSelector } from 'react-redux';
import { __getComments } from '../modules/comment';
import {
	__loadAarticles,
	__loadAarticleGetId,
	__delArticle,
} from '../modules/article';

// compo & elem & share & util
import Template from '../components/Template';
import List from '../components/List';
import Comments from '../components/Comments';
import CommentForm from '../components/CommentForm';
import { Flex, Text, Button, UserIcon } from '../elem';
import { dateConvert } from '../util';

const Article = ({ history, match }) => {
	const dispatch = useDispatch();
	const article = useSelector((store) => store.article.article);
	const comments = useSelector((store) => store.comment.comments);
	const isLogin = useSelector((store) => store.user.is_login);
	const username = useSelector((store) => store.user.user);

	const {
		params: { id },
	} = match;

	useEffect(() => {
		dispatch(__loadAarticles());
		dispatch(__loadAarticleGetId(id));
		dispatch(__getComments(id));
	}, [id]);

	if (!article) {
		return <div>로딩중..</div>;
	}

	return (
		<Template>
			<Container>
				<Contents>
					<Title>
						<Text color='#ff6b6b'>글 번호 ({article.id})</Text>
						<Flex between>
							<Text fs='40px' mg='20px 0' fw='600'>
								{article.title}
							</Text>
							<Flex gap='10px'>
								{isLogin && username.id === article.username ? (
									<>
										<Button
											small
											outline
											_onClick={() => {
												history.push(`/article/${id}/edit`);
											}}
										>
											수정
										</Button>
										<Button
											small
											outline
											_onClick={() => {
												const result =
													window.confirm('정말 이 레시피를 삭제할까요?');
												if (result) {
													dispatch(__delArticle(id));
												}
											}}
										>
											삭제
										</Button>
									</>
								) : (
									''
								)}
								<Button
									small
									primary
									_onClick={() => {
										history.push('/');
									}}
								>
									목록으로
								</Button>
							</Flex>
						</Flex>
					</Title>
					<Main>
						<Info>
							<Flex between>
								<Text fs='18px' fw='500' color='#333'>
									<Flex center gap='10px'>
										<UserIcon />
										{article.username}
									</Flex>
								</Text>
								<Text fs='18px' fw='500' color='gray'>
									{dateConvert(article.createdAt)}
								</Text>
							</Flex>
						</Info>
						<Desc>
							<Flex center mg='20px 0 100px 0'>
								<Image src={article.imageUrl} alt='img' />
							</Flex>
							<Text fs='16px' color='#333' lh='150%' ws='pre-wrap'>
								{article.content}
							</Text>
						</Desc>
					</Main>
					{comments.map((comment) => (
						<Comments comment={comment} key={comment.id} id={id} />
					))}
				</Contents>
				{isLogin && <CommentForm id={id} />}
				<List history={history} />
			</Container>
		</Template>
	);
};

const Image = styled.img`
	width: 50%;
	border-radius: 8px;
`;

const Desc = styled.div`
	width: 100%;
	padding: 48px;
	min-height: 300px;
`;

const Info = styled.div`
	margin: 20px 0;
`;

const Title = styled.div`
	border-bottom: 1px solid #ddd;
	padding-bottom: 24px;
`;

const Main = styled.main``;

const Container = styled.article`
	width: 70%;
	margin-top: 100px;
`;

const Contents = styled.div`
	background-color: #fff;
	border-radius: 10px;
	padding: 32px;
	width: 100%;
	min-height: 300px;
`;

export default Article;
