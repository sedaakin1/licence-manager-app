import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import tenants from '../../api/tenants.json';
import Select from 'react-select';
import {createLicenseManagerCustomer} from '../../services/broker';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';


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
  padding: 50px;
  max-width: 35%;
  margin: 80px auto 0;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
`;

const InputLabel = styled.div`
  font-size: 18px;
  color: #333;
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
  color: #333;
  &::placeholder {
    color: #42b983;
`;

const SelectStyle = styled.div`
width: 320px;
font-size: 16px;
`;

const AddCustomer = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name:"",
    email:"",
    customerTenantId:"",
  })

  const options = tenants.map((tenant) => ({
    label: tenant.name,
    value: tenant.id,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const lead = {
      name: form.name,
      email: form.email,
      customer_tenant_id: form.customerTenantId,
      created_at: new Date().toISOString(),
    };

    createLicenseManagerCustomer(lead).then((e) => {
      console.log(e);
      navigate('/customer/list');
    });
   
  };

  const handleChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    })
  }

  return (
    <div className="App">
      <MainContainer>
       <Header title={"MÜŞTERİ TANIMLAMA"}/>

        <GridContainer>
          
                <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                  <InputRow>
                    <InputLabel>MÜŞTERİ SEÇİNİZ</InputLabel>
                    <SelectStyle>
                      <Select
                        options={options}
                        value={options.find(x => x.value == form.customerTenantId)}
                        onChange={(selectedOption) => {
                          setForm({
                            ...form,
                            customerTenantId:selectedOption.value
                          })
                        }}
                        placeholder=""
                      />
                    </SelectStyle>
                  </InputRow>

                  <InputRow>
                    <InputLabel>MÜŞTERİ SORUMLUSU AD/SOYAD</InputLabel>
                    <TextInput
                    id='name'
                      type="text"
                      placeholder="AD / SOYAD GİRİNİZ"
                      value={form.name}
                      onChange={handleChangeForm}
                    />
                  </InputRow>
                  <InputRow>
                    <InputLabel>MÜŞTERİ SORUMLUSU EMAİL</InputLabel>
                    <TextInput
                      type="text"
                      placeholder="EMAİL GİRİNİZ"
                      value={form.email}
                      onChange={(e) => setForm({...form,email:e.target.value})}
                    />
                  </InputRow>
                  <button type="button" onClick={handleSubmit}
                  style={{
                    backgroundColor: "#42b983",
                    color: "#fff",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    marginTop: "20px",
                    height: "25px",
                  }}>
                  Formu Gönder
                  </button>
                </div>
                       
        </GridContainer>
      </MainContainer>
    </div>
  );
};

export default AddCustomer;

