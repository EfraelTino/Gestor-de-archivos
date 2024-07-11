import { Card, CardBody } from "react-bootstrap";
import { TittleComponent } from "./TittleComponent";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import CardText from "react-bootstrap/esm/CardText";
import { useEffect, useState } from "react";
import { InputElement } from "./InputElement";
import { userAuth } from "../../hooks/AuthProvider";
import { insertFormulario } from "../../api/podcast";
import { useNavigate, useParams } from "react-router-dom";
import { decryptId } from "../../utils/util";

const podcasts = [
  {
    id: 1,
    number: "1",
  },
  {
    id: 2,
    number: "2",
  },
  {
    id: 3,
    number: "3",
  },
  {
    id: 4,
    number: "4",
  },
];
const logo = [
  {
    id: 1,
    logo: "http://tupodcast.pe/wp-content/uploads/2024/05/01.png",
    name: "Primer Logo",
    text: "Nombre y cargo",
  },
  {
    id: 2,
    logo: "http://tupodcast.pe/wp-content/uploads/2024/05/2024-04-12-12_57_38-Window.png",
    name: "Segundo Logo",
    text: "Logo, Nombres y Cargo",
  },
  {
    id: 3,
    logo: "http://tupodcast.pe/wp-content/uploads/2024/05/2024-04-12-12_57_58-Window.png",
    name: "Tercer Logo",
    text: "Nombre y Cargo mas minimalista",
  },
  {
    id: 4,
    logo: "",
    name: "Cuarto Logo",
    text: "Otro: ",
  },
];
export const FormularioComponent = () => {
  const {podcastid, iduser} = useParams();
  const {formid} = userAuth()
  const decriptuserid = decryptId(iduser)
  const navigate = useNavigate();
  const [foto, setFoto] = useState(null);
  const [logoSeleccionado, setLogoSeleccionado] = useState("");
  const [errordata, setErrorData] = useState({cliente: "", colorp: "", invitados:""});
  const { user } = userAuth();
  const idUsuario = user.result.id;
  const [formData, setFormData] = useState({
    cliente: "",
    colorp: "",
    colors: "",
    invitadoone: "",
    invitadodos: "",
    invitadotres: "",
    episodios: "",
    otro: "",
    idformuser: formid
  });
  // const filterid= 
    const handleLogoSeleccionado = (id, text) => {
      setLogoSeleccionado(id);
      setFormData((prevFormData) => ({
        ...prevFormData,
        otro: text,
      }));
    };
    const handleFileUpload = (event) => {
      setFoto(event.target.files[0]);
      // No es necesario incluir el archivo en el formData aquí,
      // ya que ya lo agregas en el handleSubmit
    };
    
  const [checkedState, setCheckedState] = useState(
    new Array(podcasts.length).fill(false)
  );
  const handleChecked = (index) => {
    setCheckedState((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      console.log("checked ", newState); // Accede al estado más recienteÑ
      setFormData((prevFormData) =>({
        ...prevFormData,
        episodios:newState
      }))
      return newState;
    });
  };

  const handleChange = (e) => {
    const { name, value, } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    console.log(formData);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("enviar backend: ", formData);
    try {
      const sendata = new FormData();
      sendata.append("action", "insertarfomulario");
      sendata.append("idusuario", idUsuario);
      Object.keys(formData).forEach((key) => {
        // Asegúrate de no incluir el archivo en los datos normales
        if (key !== 'foto') {
          sendata.append(key, formData[key]);
        }
      });
      // Agrega el archivo al FormData aquí
      sendata.append("foto", foto);
      const response = await insertFormulario(sendata);
      console.log("response: ", response)
      const data = response.data;
      if(data.success){
        navigate('/felicidades')
      }else{
        console.log("error en else: ",data.message)
      }

    } catch (error) {
      console.log("error: ", error);
    }
  };
  

  useEffect(() => {
    if(idUsuario !== decriptuserid){
      navigate("/dashboard");
    }
    if(parseInt(podcastid) !== formid){
      navigate("/dashboard");

    }
  }, [logoSeleccionado, foto]);

  return (
    <div className="p-5 bg-principal py-5">
      <Container>
        <TittleComponent>Información para banners y diseños</TittleComponent>
        <Form className="mt-4" onSubmit={handleSubmit}>
          <InputElement
            place="Tu respuesta "
            val={formData.cliente}
            identificator="cliente" // Cambiar id a identificator
            names="cliente" // Cambiar name a names
            titlelabel="Nombre del cliente"
            events={handleChange} // Cambiar onChange a events
          />

          <Card className="bg-warning w-100 mt-4">
            <CardBody className="bg-black rounded">
              <CardText className="text-warning">
                <label className="form-label text-white mb-1">
                  <strong className="text-white">Número de podcast</strong>
                </label>
                {podcasts.map((item, index) => (
                  <li className="form-check" key={item.id}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`podcast-${item.id}`}
                      name={`podcast-${item.number}`}
                      value={`Podcast ${item.number}`}
                      checked={checkedState[index] || false}
                      onChange={() => handleChecked(index)}
                    />
                    <label
                      className="form-check-label text-white"
                      htmlFor={`podcast-${item.id}`}
                    >
                      Podcast {item.number}
                    </label>
                  </li>
                ))}
              </CardText>
            </CardBody>
          </Card>
          <Card className="bg-warning w-100 mt-4">
            <CardBody className="bg-black rounded">

                <label className="form-label text-white mb-1">
                  <strong className="text-white">Tipo de Banner</strong>
                </label>
                <ul className="d-flex  justify-items-between flex-wrap gap-4">
                  {logo.map((item) => (
                    <li className="form-check" key={item.id}>
                      <div>
                        {item.logo && <img src={item.logo} alt={item.name} />}
                        <input
                          type="radio"
                          className="form-check-input"
                          id={`logo-${item.id}`}
                          name="logo"
                          value={item.id}
                          checked={logoSeleccionado === item.id}
                          onChange={() => handleLogoSeleccionado(item.id ,item.text)}
                        />

                        
                        <label
                          className="form-check-label text-white"
                          htmlFor={`logo-${item.id}`}
                        >
                          {item.text}
                        </label>
                        {item.id === 4 &&
                          logoSeleccionado === 4 && ( // Mostrar el input solo cuando se selecciona "Otro"
                            <InputElement
                              place="Tu respuesta"
                              val={formData.otro}
                              identificator="otro"
                              names="otro"
                              events={handleChange}
                            />
                          )}
                      </div>
                    </li>
                  ))}
                </ul>
            </CardBody>
          </Card>
          <InputElement
            place="Tu respuesta"
            val={formData.colorp}
            identificator="colorp"
            names="colorp"
            titlelabel="Color principal para el banner"
            events={handleChange}
          />
          <InputElement
            place="Tu respuesta"
            val={formData.colors}
            identificator="colors"
            names="colors"
            titlelabel="Color secundario para el banner"
            events={handleChange}
          />
          <InputElement
            place="Tu respuesta"
            val={formData.invitadoone}
            identificator="invitadoone"
            names="invitadoone"
            titlelabel="Nombres y cargo de invitados 01"
            events={handleChange}
          />
          <InputElement
            place="Tu respuesta"
            val={formData.invitadodos}
            identificator="invitadodos"
            names="invitadodos"
            titlelabel="Nombres y cargo de invitados 02"
            events={handleChange}
          />
          <InputElement
            place="Tu respuesta"
            val={formData.invitadotres}
            identificator="invitadotres"
            names="invitadotres"
            titlelabel="Nombres y cargo de invitados 03"
            events={handleChange}
          />
          <Card className="bg-warning w-100 mt-4">
            <CardBody className="bg-black rounded">
              <div className="text-warning">
                <label className="form-label text-white mb-1">
                  Adjuntar logo
                </label>
                <div className="input-group  p-2 bg-white rounded">
                  <div className="custom-file d-flex align-items-center">
                    <input
                      accept=".png, .jpg, .jpeg, .webp"
                      onChange={handleFileUpload}
                      type="file"
                      className="custom-file-input bg-white"
                      required
                    />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <div className="pb-5">
            <button
              className="btn btn-warning btn-rounded float-start mt-3 fw-semibold"
            >
              Enviar
            </button>
          </div>
        </Form>
      </Container>
    </div>
  );
};
