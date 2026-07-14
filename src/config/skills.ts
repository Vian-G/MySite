export type SkillCategory = {
  label: string;
  title: string;
  description: string;
};

export const skills: SkillCategory[] = [
  {
    label: 'Hardware / Embedded',
    title: 'Microcontrollers, PCB Design, Sensors',
    description: 'STM32, ESP32, Altium Designer, I2C/SPI/UART, Motor Drivers, Power Electronics.',
  },
  {
    label: 'Software / Controls',
    title: 'RTOS, Kinematics, Control Theory',
    description: 'C/C++, Python, ROS2, PID, State Estimation, Trajectory Generation.',
  },
  {
    label: 'Perception',
    title: 'Computer Vision, Sensor Fusion',
    description: 'OpenCV, LiDAR integration, Kalman Filters, SLAM fundamentals.',
  },
  {
    label: 'Mechanical',
    title: 'CAD, Rapid Prototyping',
    description: 'SolidWorks, 3D Printing, Machining fundamentals, Actuator sizing.',
  },
];
