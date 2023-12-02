import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { deleteLicenseManagerCustomer, getLicenseManagerCustomerById, updateLicenseManagerCustomer } from '../../services/broker';
import Header from '../../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toggle/style.css';
import Toggle from 'react-toggle';
import tenants from '../../api/tenants.json';

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
`;

const SelectStyle = styled.div`
width: 320px;
font-size: 16px;
color: #333;
`;

const ToggleButton = ({id, checked, onChange}) => (
  <label>
    <Toggle id={id} checked={checked} onChange={onChange} />
  </label>
);

const EditCustomer = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  const [form, setForm] = useState({
    name: "",
    email:"",
    customerTenantId:"",
    selectedTenant:"",
    isActive: true,
    isActiveButton: true,
    
  });

  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    getLicenseManagerCustomerById(id).then((data) => {
      setCustomer(data);
      setForm({
        name: data.name,
        email: data.email,
        customerTenantId: data.customer_tenant_id,
        isActive: data.is_active,
        isActiveButton: data.is_active,
      });
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const lead = {
      id: id,
      name: form.name,
      email: form.email,
      customer_tenant_id: form.customerTenantId,
      is_active: form.isActive,
      updated_at: new Date().toISOString(),
    };
    
    updateLicenseManagerCustomer(lead).then(() => {
      navigate('/customer/list');
    });
  };

  const handleDelete = () => {

    const sure = window.confirm("Silmek istediğinizden emin misiniz?");
    if (!sure) return;

    deleteLicenseManagerCustomer(id).then(() => {
      console.log("Müşteri silme işlemi başarılı.");

      navigate('/customer/list');
    }).catch((error) => {
      console.error("Müşteri silme işlemi sırasında bir hata oluştu:", error);
    });

  };

  const options = tenants.map((tenant) => ({
    label: tenant.name,
    value: tenant.id,
  }));

  const handleChangeForm = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    
    setForm({
      ...form,
      [e.target.id]: value,
    });
  };

  return (
    <div className="App">
      <MainContainer>
        <Header title={"MÜŞTERİ DÜZENLEME"} />

        <GridContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </InputRow>
            <InputRow>
              <InputLabel>Aktif mi?</InputLabel>
              <ToggleButton
              id="isActive"
              checked={form.isActive}
              onChange={handleChangeForm}             
              />
            </InputRow>

            <button onClick={handleSubmit}
            style={{
                    backgroundColor: "#42b983",
                    color: "#fff",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    marginTop: "20px",
                    height: "25px",
            }}>
              Güncelle
            </button>
            {!form.isActiveButton && 
            <button onClick={handleDelete}
            style={{
                    backgroundColor: "#42b983",
                    color: "#fff",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    height: "25px",
            }}>
              Sil
            </button>
            }
            <button onClick={e => navigate("/customer/list")}
            style={{
                    backgroundColor: "#42b983",
                    color: "#fff",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    height: "25px",
            }}>
              İptal
            </button>

          </div>
        </GridContainer>
      </MainContainer>
    </div>
  );
}

export default EditCustomer;