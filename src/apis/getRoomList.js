const getRoomList = async pageIndex => {
  const url = `/mockup/page=${pageIndex}.json`;

  console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('서버 에러');
    }
    return response.json();
  } catch (e) {
    alert(e);
    console.log(e);
    return '';
  }
};

export default getRoomList;
