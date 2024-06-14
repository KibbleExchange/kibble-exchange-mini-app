import {
  FairBox,
  FairBoxRow,
  FairEndIn,
  FairHeader,
  FairLaunchContainer,
  FairLaunchWrapper,
  FairList,
  FairProgress,
  FairProgressBar,
  FairProgressCompare,
  FairProgressHeader,
  FairProgressPercent,
  FairStatus,
  FairTags,
  FairTime,
} from "./styled";
import fair_icon_1 from "../../../assets/Dashboard/Launchpad/FAIR/fair_icon_1.jpg";
import fair_kibble from "../../../assets/Dashboard/Launchpad/FAIR/kibble.png";
import fair_icon_2 from "../../../assets/Dashboard/Launchpad/FAIR/fair_icon_2.jpg";
import fair_icon_3 from "../../../assets/Dashboard/Launchpad/FAIR/fair_icon_3.jpg";
import fair_icon_4 from "../../../assets/Dashboard/Launchpad/FAIR/fair_icon_4.jpg";
import NoData from "../../../components/Common/Nodata";
import { ButtonCommon } from "../../../Layout/styled";
import { useNavigate } from "react-router-dom";
import ItemFair from "./itemFair";

const FairLaunch = () => {
  const navigate = useNavigate();

  const handleViewDetailProject = async () => {
    try {
      navigate("/launchpad/123?lauch");
    } catch (error) {
      console.log("view detai", error);
    }
  };

  return (
    <FairLaunchContainer>
      <FairLaunchWrapper>
      {/* <NoData
            title="NO project available"
            content="There is no project available recently. Please wait for the next launch on Kibble."
          /> */}
        {fairLaunchData.length > 0 ? (
          <FairList>
            {fairLaunchData.map((item, index) => {
              return (
                <ItemFair
                  key={index}
                  data={item}
                  onViewDetailProject={handleViewDetailProject}
                />
              );
            })}
          </FairList>
        ) : (
          <NoData
            title="NO project available"
            content="There is no project available recently. Please wait for the next launch on Kibble."
          />
        )}
      </FairLaunchWrapper>
    </FairLaunchContainer>
  );
};

const fairLaunchData = [
  {
    icon: fair_kibble,
    title: "Kibble",
    countDown: "18 : 10: 48 : 20",
    tag: "Upcoming",
    joiner: 5,
    liq: 100,
    liquidity: 20,
    offered: 50000000,
    progress: 0,
    total: 22689.37,
    softCap: 225000,
    price: 0.009
  },
  // {
  //   icon: fair_icon_2,
  //   title: "CARDIFY Coin",
  //   countDown: "18 : 10: 48 : 20",
  //   tag: "Sale live",
  //   joiner: 5,
  //   liq: 100,
  //   liquidity: 51,
  //   offered: 10000000,
  //   progress: 20,
  //   total: 22689.37,
  // },
  // {
  //   icon: fair_icon_3,
  //   title: "CARDIFY Coin",
  //   countDown: "18 : 10: 48 : 20",
  //   tag: "Sale live",
  //   joiner: 5,
  //   liq: 100,
  //   liquidity: 51,
  //   offered: 10000000,
  //   progress: 20,
  //   total: 22689.37,
  // },
  // {
  //   icon: fair_icon_4,
  //   title: "CARDIFY Coin",
  //   countDown: "18 : 10: 48 : 20",
  //   tag: "Sale live",
  //   joiner: 5,
  //   liq: 100,
  //   liquidity: 51,
  //   offered: 10000000,
  //   progress: 20,
  //   total: 22689.37,
  // },
  // {
  //   icon: fair_icon_1,
  //   title: "CARDIFY Coin",
  //   countDown: "18 : 10: 48 : 20",
  //   tag: "Sale live",
  //   joiner: 5,
  //   liq: 100,
  //   liquidity: 51,
  //   offered: 10000000,
  //   progress: 20,
  //   total: 22689.37,
  // },
  // {
  //   icon: fair_icon_2,
  //   title: "CARDIFY Coin",
  //   countDown: "18 : 10: 48 : 20",
  //   tag: "Sale live",
  //   joiner: 5,
  //   liq: 100,
  //   liquidity: 51,
  //   offered: 10000000,
  //   progress: 20,
  //   total: 22689.37,
  // },
];

export default FairLaunch;
