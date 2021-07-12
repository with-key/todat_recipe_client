import axios from 'axios';

// api 인스턴스 생성
// api가 많아서 인스턴스 생성하는 방식으로 해서 중복코드 줄일게요!

const api = axios.create({
	// 인스턴스
	baseURL: 'http://localhost:4000', // 저희 서버 아이피로 변경하세요!
	headers: {
		'content-type': 'application/json;charset=UTF-8',
		accept: 'application/json,',
	},
});

export const apis = {
	// article
	add: (contents) => api.post('/posts', contents),
	edit: () => {},
	articles: () => api.get('/posts'),
	article: (id) => api.get(`/posts/${id}`),

	// comment
	addComment: (comment) => api.post('/comments', comment),
	comments: (id) =>
		api.get('/comments/', {
			params: {
				postId: id,
			},
		}),

	// login
	login: (id, pw) => api.post('/user', { username: id, password: pw }),
	logout: () => api.post('/user'),
	signup: (id, email, pw, pwcheck) =>
		api.post('/user/signup', {
			username: id,
			email: email,
			password: pw,
			repassword: pwcheck,
		}),
};
