import axios from 'axios';
import END_POINT from 'apis/END_POINT';
import getSavedJWT from 'utils/getSavedJWT';

const postMakeRoom = async roomData => {
  try {
    const url = END_POINT + `/bobs/room`;
    const config = {
      headers: {
        Authorization: getSavedJWT(),
      },
    };
    const response = await axios.post(url, roomData, config);
    // 403 에러가 뜬 시점에서 이미 에러로 인식해버림
    // console.log(response);

    if (response.status !== 200) {
      throw new Error('recent create room');
    }
    return response.data.roomId;
  } catch (error) {
    if (error.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      if (error.response.data.interCode === -2) {
        alert('1시간 이내에 방 생성.');
      }
    }

    return 0;
  }
};

export default postMakeRoom;
