import { Table } from "antd";
import { TableContainer } from "./styled";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextProviderWrapper } from "@kibble-exchange/uikit";

const { Column } = Table;

const TableCommon = ({ data, heading, moveTo }: any) => {
  const navigate = useNavigate();
  const { theme } = useContext(ContextProviderWrapper)!;
  return (
    <TableContainer className={theme}>
      <Table
        dataSource={data}
        pagination={{ showSizeChanger: false }}
        onRow={(record) => {
          return {
            onClick: () => {
              moveTo ? navigate(`${moveTo}/${record.address}`) : <></>;
            },
          };
        }}
      >
        {heading.map((item: any) => {
          return (
            <Column
              title={item.name}
              dataIndex={item.dataIndex}
              key={item.key}
              render={item.render}
            />
          );
        })}
      </Table>
    </TableContainer>
  );
};

export default TableCommon;
