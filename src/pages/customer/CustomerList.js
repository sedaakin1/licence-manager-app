import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import tenants from '../../api/tenants.json';
import Select from 'react-select';
import {createLicenseManagerCustomer, getAllLicenseManagerCustomers} from '../../services/broker';
import Header from '../../components/Header';
import { RiUserLocationLine } from "react-icons/ri";


const MainContainer = styled.div`
  background: linear-gradient(to bottom, rgba(175, 178, 184, 1) 10%, rgba(208, 210, 212, 1) 25%, rgba(231, 233, 236, 1) 50%, rgba(208, 210, 212, 1) 76%, rgba(175, 178, 184, 1) 90%);

  height: 100vh;
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  background: white;
  border: 2px solid #808080;
  border-radius: 10px;
  padding: 10px;
  max-width: 35%;
  width: 100%;
  margin: 80px auto 0;
  overflow-y: auto;
  max-height: 500px;
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
    background-color: #f2f2f2; /* Beyaz arka plan */
  }
  &:nth-child(odd) {
    background-color: #ccc; /* Gri arka plan */
  }
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: absolute;
  top: 150px;
  right: 575px;
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
            <TableCell><p>Active</p></TableCell>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell><RiUserLocationLine /></TableCell>
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

