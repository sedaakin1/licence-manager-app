import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import tenants from '../../api/tenants.json';
import Select from 'react-select';
import {createLicenseManagerCustomer, getAllLicenseManagerCustomers} from '../../services/broker';
import Header from '../../components/Header';
import { FaGear } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const MainContainer = styled.div`
  background: #F5F5F5;
  height: 100vh;
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background: white;
  border-radius: 10px;
  max-width: 45%;
  width: 100%;
  margin: 80px auto 0;
  overflow-y: auto;
  max-height: 475px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);

  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #42b983;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f5f5f5;
    border-radius: 10px;
  }
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const InputLabel = styled.div`
  font-size: 18px;
  color: #808080;
  width: 300px;
  &:hover {
    color: #42b983;
  }
`;

const TextInput = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const SelectStyle = styled.div`
width: 320px;
font-size: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #E8F4E8;
  }
  &:nth-child(odd) {
    background-color: #fff;
  }
  border-bottom: 5px solid #fff;

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 13px;
  color: #333;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: absolute;
  top: 150px;
  right: 510px;
`;

const AddButton = styled.button`
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;


const CustomerList = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getAllLicenseManagerCustomers().then((data) => {
      setCustomers(data);
    });
  }, []);

  return (
    <div className="App">
      <MainContainer>
       <Header title={"MÜŞTERİ LİSTESİ"}/>

       <ButtonContainer>
            <AddButton onClick={() => navigate('/customer/add')}>
              Yeni Müşteri Ekle
            </AddButton>
        </ButtonContainer>

        <GridContainer>
        <Table>
        <thead>
          <TableRow>
            <TableCell>Active</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Icon</TableCell>
          </TableRow>
        </thead>
        <tbody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>{customer.is_active ? "Aktif": "Pasif"}</TableCell>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>
            <Link to={`/customer/edit/${customer.id}`}>
            <FaGear />
            </Link>
            </TableCell>
          </TableRow>
        ))}
        </tbody>
        </Table>                
        </GridContainer>
      </MainContainer>
    </div>
  );
};

export default CustomerList;

