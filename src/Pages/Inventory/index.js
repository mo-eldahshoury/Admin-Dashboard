import { Avatar, Rate, Space, Table, Typography, Button } from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../../API";
import { FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import html2pdf from "html2pdf.js";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataSource);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
    XLSX.writeFile(workbook, "inventory-report.xlsx");
  };

  const exportToPDF = () => {
    const element = document.getElementById("inventory-table-to-pdf");
    const options = {
      margin: 10,
      filename: 'inventory-report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <Space size={20} direction="vertical" style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", marginTop: "24px" }}>
        <Typography.Title level={4} style={{ margin: 0 }}>Inventory</Typography.Title>
        <Space>
          <Button
            type="primary"
            icon={<FileExcelOutlined />}
            onClick={exportToExcel}
            style={{ backgroundColor: "#107c41", borderColor: "#107c41" }}
          >
            Export Excel
          </Button>
          <Button
            type="primary"
            danger
            icon={<FilePdfOutlined />}
            onClick={exportToPDF}
          >
            Export PDF
          </Button>
        </Space>
      </div>

      <div id="inventory-table-to-pdf" style={{ width: "100%", backgroundColor: "#fff" }}>
        <Table
          loading={loading}
          columns={[
            {
              title: "Thumbnail",
              dataIndex: "thumbnail",
              render: (link) => {
                return <Avatar src={link} />;
              },
            },
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => <span>${value}</span>,
            },
            {
              title: "Rating",
              dataIndex: "rating",
              render: (rating) => {
                return <Rate value={rating} allowHalf disabled />;
              },
            },
            {
              title: "Stock",
              dataIndex: "stock",
            },
            {
              title: "Brand",
              dataIndex: "brand",
            },
            {
              title: "Category",
              dataIndex: "category",
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 8,
            position: ["bottomCenter"],
          }}
          scroll={{ y: 400 }}
          rowKey="id"
        ></Table>
      </div>
    </Space>
  );
}

export default Inventory;