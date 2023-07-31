import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import axios from 'axios';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const ReporteInactivos = () => {
  const [estudiantes, setEstudiantes] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('https://form-node-back.onrender.com/estudianteina')
      .then((response) => {
        setEstudiantes(response.data.estudiantes);
      })
      .catch((error) => {
        console.log('Error al obtener usuarios inactivos:', error);
      });
  }, []);

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>Reporte de Usuarios Inactivos</Text>
            {estudiantes.map((person) => (
              <View key={person.email} style={styles.item}>
                <Text>
                  Nombre: {person.nombre} {person.apellido}
                </Text>
                <Text>Email: {person.email}</Text>
                <Text>Colegio: {person.colegio}</Text>
                {/* Agrega aquí los demás campos que desees mostrar en el reporte */}
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ReporteInactivos;
