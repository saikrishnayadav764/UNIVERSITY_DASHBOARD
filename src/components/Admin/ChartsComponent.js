import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const ChartsComponent = () => {
  const [averageTotalMarksData, setAverageTotalMarksData] = useState({});
  const [subjectWiseHighestMarksData, setSubjectWiseHighestMarksData] = useState({});
  const [studentsCountByFieldData, setStudentsCountByFieldData] = useState({});
  const [topStudentsData, setTopStudentsData] = useState({});
  const [subjectPassRateData, setSubjectPassRateData] = useState({});
  const [selectedChart, setSelectedChart] = useState("subjectWiseHighestMarks");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        averageTotalMarks,
        subjectWiseHighestMarks,
        studentsCountByField,
        topStudents,
        subjectPassRate
      ] = await Promise.all([
        axios.get('https://university-backend-mtk7.onrender.com/api/students/average-total-marks'),
        axios.get('https://university-backend-mtk7.onrender.com/api/students/subjects-highest'),
        axios.get('https://university-backend-mtk7.onrender.com/api/students/count'),
        axios.get('https://university-backend-mtk7.onrender.com/api/students/top-students'),
        axios.get('https://university-backend-mtk7.onrender.com/api/students/passrate')
      ]);

      console.log('Average Total Marks Data:', averageTotalMarks.data);
      setAverageTotalMarksData({
        labels: Object.keys(averageTotalMarks.data.fieldWiseAverageTotalMarks),
        datasets: [{
          label: 'Average Total Marks',
          data: Object.values(averageTotalMarks.data.fieldWiseAverageTotalMarks),
          backgroundColor: ['#FF6384', '#36A2EB']
        }]
      });

      setStudentsCountByFieldData(studentsCountByField.data);

      setTopStudentsData({
        labels: Object.keys(topStudents.data),
        datasets: [{
          label: 'Top Student marks',
          data: Object.values(topStudents.data).map(item => item.totalMarks),
          backgroundColor: ['#4BC0C0', '#FFCE56', '#36A2EB']
        }]
      });

      // Define colors for each field
      const fieldColors = {
        Arts: '#FF6384',
        Engineering: '#36A2EB',
        Commerce: '#FFCE56',
        Science: '#4BC0C0'
      };

      const subjectWiseHighestMarksColors = {
        Arts: '#FF1493',          // DeepPink
        Engineering: '#9932CC',   // DarkOrchid
        Commerce: '#4169E1',      // RoyalBlue
        Science: '#FFD700',       
      };
      
      const studentsCountByFieldColors = {
        Arts: '#4BC0C0',
        Engineering: '#FFCE56',
        Commerce: '#36A2EB',
        Science: '#FF6384'
      };
      
      const subjectPassRateColors = {
        Arts: '#8A2BE2',        // BlueViolet
        Engineering: '#FF4500', // OrangeRed
        Commerce: '#2E8B57',    // SeaGreen
        Science: '#DAA520'      // GoldenRod
      };
      

      // Prepare data for Subject Wise Highest Marks chart
      const subjects = new Set();
      Object.values(subjectWiseHighestMarks.data).forEach(subjectData => {
        Object.keys(subjectData).forEach(subject => subjects.add(subject));
      });

      const subjectLabels = Array.from(subjects);
      const subjectWiseHighestMarksDatasets = Object.keys(subjectWiseHighestMarks.data).map(field => ({
        label: field,
        data: subjectLabels.map(subject => subjectWiseHighestMarks.data[field][subject] || 0),
        backgroundColor: subjectWiseHighestMarksColors[field] || '#000000' // Use the color for the field, default to black if not specified
      }));

      setSubjectWiseHighestMarksData({
        labels: subjectLabels,
        datasets: subjectWiseHighestMarksDatasets
      });

      // Prepare data for Subject Pass Rate chart
      const passRateSubjects = new Set();
      Object.values(subjectPassRate.data).forEach(subjectData => {
        Object.keys(subjectData).forEach(subject => passRateSubjects.add(subject));
      });

      const passRateSubjectLabels = Array.from(passRateSubjects);
      const subjectPassRateDatasets = Object.keys(subjectPassRate.data).map(field => ({
        label: field,
        data: passRateSubjectLabels.map(subject => subjectPassRate.data[field][subject] || 0),
        backgroundColor: subjectPassRateColors[field] || '#000000' // Use the color for the field, default to black if not specified
      }));

      setSubjectPassRateData({
        labels: passRateSubjectLabels,
        datasets: subjectPassRateDatasets
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    setSelectedChart(e.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <select className="form-select" onChange={handleChange}>
            <option >Select a Chart</option>
            <option value="averageTotalMarks">Average Total Marks</option>
            <option selected value="subjectWiseHighestMarks">Subject-wise Highest Marks</option>
            <option value="studentsCountByField">Students Count by Field</option>
            <option value="topStudents">Top Students</option>
            <option value="subjectPassRate">Subject Pass Rate</option>
          </select>
        </div>
      </div>

      {selectedChart === 'averageTotalMarks' && Object.keys(averageTotalMarksData).length > 0 && (
        <Line data={averageTotalMarksData} />
      )}
      {selectedChart === 'subjectWiseHighestMarks' && Object.keys(subjectWiseHighestMarksData).length > 0 && (
        <Bar data={subjectWiseHighestMarksData} />
      )}
      {selectedChart === 'studentsCountByField' && Object.keys(studentsCountByFieldData).length > 0 && (
        <Pie data={{ labels: Object.keys(studentsCountByFieldData), datasets: [{ data: Object.values(studentsCountByFieldData), backgroundColor: ['#228B22', '#FF6347','#008080','#36A2EB', ] }] }} />
      )}
      {selectedChart === 'topStudents' && Object.keys(topStudentsData).length > 0 && (
        <Doughnut data={topStudentsData} />
      )}
      {selectedChart === 'subjectPassRate' && Object.keys(subjectPassRateData).length > 0 && (
        <Bar data={subjectPassRateData} />
      )}
    </div>
  );
};

export default ChartsComponent;
