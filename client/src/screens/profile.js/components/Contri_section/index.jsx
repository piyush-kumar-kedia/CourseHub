import Container from "../../../../components/container";
import Contribution_card from "./ContributionCard";
import "./styles.scss";
import SubHeading from "../../../../components/subheading";
const Contrisection = () => {
  return (
    <Container color={"light"}>
      <div className="c_content">
        <div className="sub_head">
          <SubHeading text={"MY CONTRIBUTIONS"} type={"bold"} color={"black"} />
        </div>
        <Contribution_card
          text={"PENDING"}
          content={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, illo. Numquam cupiditate facere vitae facilis"
          }
        />
        <Contribution_card
          text={"APPROVED"}
          content={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, illo. Numquam cupiditate facere vitae facilis"
          }
        />
        <Contribution_card
          text={"DECLINED"}
          content={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, illo. Numquam cupiditate facere vitae facilis"
          }
        />
      </div>
    </Container>
  );
};
export default Contrisection;
