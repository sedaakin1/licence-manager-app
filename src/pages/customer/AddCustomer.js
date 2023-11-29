import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import tenants from '../../api/tenants.json';
import Select from 'react-select';
import {createLicenseManagerCustomer} from '../../services/broker';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';


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
  border-radius: 20px;
  padding: 50px;
  max-width: 35%;
  margin: 80px auto 0;
  
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
                  <button type="button" onClick={handleSubmit}>Formu Gönder</button>
                </div>
                       
        </GridContainer>
      </MainContainer>
    </div>
  );
};

export default AddCustomer;

