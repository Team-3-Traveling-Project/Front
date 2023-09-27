import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { baseInstance } from '../apis/config';

const Redirection = () => {
  const code = window.location.search;
  console.log(code);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseInstance.post(`/user/kakao${code}`);
        console.log(response);

        // 토큰을 받아서 localStorage 같은 곳에 저장하는 코드를 여기에 쓴다.
        localStorage.setItem('Authorization', response.headers.authorization); // 일단 이름만 저장했다.

        navigate('/');
      } catch (error) {
        console.log('kakao 소셜 로그인 에러 : ', error);
        window.alert('소셜 로그인에 실패하였습니다.');
        window.location.href = `/login`;
      }
    };

    fetchData();
  }, []);

  return <div>로그인 중입니다.</div>;
};

export default Redirection;
