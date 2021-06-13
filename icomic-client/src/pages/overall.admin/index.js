import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoriesChart from "./LineChart";
import CompleteChart from './PieChart'
import { getAllStoriesAsync } from "../../redux/actions/stories.action";
import { getAllCategoriesAsync } from "../../redux/actions/categories.actions";

const Overall = () => {
  const dispatch = useDispatch();
  const {stories, totalStories} = useSelector((state) => state.stories);

  let totalChapter = 0;

  stories.forEach((item) => {
    totalChapter += (item.chapters && item.chapters.length);
  });

  let avg = Math.ceil(totalChapter / ((totalStories > 0 && totalStories) || 1));

  useEffect(() => {
    dispatch(getAllStoriesAsync({page: -1}));
    dispatch({
      type: "SET_ADMIN_TITLE",
      payload: "Tổng quan",
    });
  }, []);

  useEffect(() => {
    dispatch(getAllCategoriesAsync({page: -1}));
  }, []);

  return (
    <div id="overall-tab">
      <div className="overall-tab-container">
        <div className="pie-chart-container">
          <h5>Tỉ lệ hoàn thành (Tổng số: {totalStories})</h5>
          <CompleteChart totalStories={totalStories || 1} />
        </div>
        <div className="pie-chart-container">
          <h5>Số chương trung bình:</h5>
          <h1 style={{ color: "red" }}>{avg}</h1>
          <h5 style={{ marginTop: 24 }}>Tổng số chương</h5>
          <h1 style={{ color: "red" }}>{totalChapter}</h1>
        </div>
        
        <div className="high-chart-container">
          <CategoriesChart />
        </div>
      </div>
    </div>
  );
};

export default Overall;
