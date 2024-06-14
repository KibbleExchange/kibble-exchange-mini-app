import styled from "styled-components";

export const TableContainer = styled.div`
  &.light {
    .ant-table-container {
      .ant-table-cell {
        color: #43424a;
        font-weight: 500;
      }
    }
    .ant-pagination {
      & > li {
        &.ant-pagination-item {
          background-color: #43424a;
          &:hover {
            background-color: #007af5;
          }
          &.ant-pagination-item-active {
            background-color: #007af5;
          }
        }
        .ant-pagination-item-ellipsis {
          color: #6d6d6d !important;
        }
        .ant-pagination-item-link {
          svg {
            path {
              fill: #6d6d6d;
            }
          }
        }
      }
    }
  }
  .ant-table {
    background-color: transparent;
    border-radius: 12px !important;
  }
  .ant-pagination-item-ellipsis {
    color: #fff !important;
  }
  .ant-table-placeholder {
    background: transparent !important;
    .ant-table-cell {
      background: transparent !important;
    }
  }
  .ant-empty-normal .ant-empty-description {
    color: #fff;
  }
  .ant-table-container {
    .ant-table-cell {
      background: transparent;
      color: #fff;
      border: 0;
      vertical-align: middle;
      padding: 32px;
      font-size: 16px;
      &::before {
        content: none !important;
      }
    }
    .ant-table-thead {
      .ant-table-cell {
        &:first-child {
          border-top-left-radius: 12px;
        }
        &:last-child {
          border-top-right-radius: 12px;
        }
      }
    }
    .ant-table-cell-row-hover {
      background-color: #252831 !important;
      cursor: pointer;
    }
  }
  .ant-table-tbody {
    .ant-table-row {
      &:last-child {
        .ant-table-cell {
          &:first-child {
            border-bottom-left-radius: 12px;
          }
          &:last-child {
            border-bottom-right-radius: 12px;
          }
        }
      }
    }
  }
  .ant-pagination {
    margin-bottom: 0 !important;
    svg {
      path {
        fill: #fff;
      }
    }
    .ant-pagination-item {
      border-radius: 8px;
      background: #1b1c20;
      border: none;
      transition: all 0.25s ease;
      &:hover {
        background-color: #007af5;
      }
      a {
        color: #fff;
      }
      &.ant-pagination-item-active {
        background-color: #007af5;
      }
    }
  }
  @media screen and (max-width: 1440px) {
    .ant-table-content {
      overflow-x: auto;
    }
  }
  @media screen and (max-width: 767px) {
    thead {
      display: none;
    }
    .ant-table-cell {
      padding: 10px !important;
    }
    .ant-table-row {
      display: flex;
      flex-direction: column;
      width: 100%;
      border-radius: 10px;
      overflow: hidden;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
    .ant-pagination {
      flex-wrap: unset;
      justify-content: center;
    }
    .ant-table-thead {
      .ant-table-cell {
        &:first-child {
          border-top-left-radius: 0;
        }
        &:last-child {
          border-top-right-radius: 0;
        }
      }
    }
    .ant-table-tbody {
      .ant-table-row {
        &:last-child {
          .ant-table-cell {
            &:first-child {
              border-bottom-left-radius: 0;
            }
            &:last-child {
              border-bottom-right-radius: 0;
            }
          }
        }
      }
    }
  }
`;
