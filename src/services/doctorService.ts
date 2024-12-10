import Doctors from "../models/Doctors";
import User from "../models/User";

export const createDoctor = async (payload: any) => {
  const doctor = await Doctors.create(payload);
  return doctor;
};

export const getDoctorById = async (id: number) => {
  const user = User.findByPk(id);
  if (!user) {
    throw new Error("Doctor not found");
  }
  const doctor = Doctors.findOne({ where: { user_id: id } });
  return doctor;
};

export const updateDoctorById = async (payload: any, id: number) => {
  const user = User.findByPk(id);

  if (!user) {
    throw new Error("Doctor not found");
  }

  const doctor = Doctors.update(payload, { where: { user_id: id } });
  return doctor;
};

export const deactivateDoctorById = async (id: number) => {
  const user = User.findByPk(id);

  if (!user) {
    throw new Error("Doctor not found");
  }

  const doctor = Doctors.update({ status: false }, { where: { user_id: id } });
  return doctor;
};

export const checkDoctorExists = async (id: number) => {
  const user = User.findByPk(id);

  if (!user) {
    throw new Error("Doctor not found");
  }

  const doctor = Doctors.findOne({ where: { user_id: id } });
  return doctor;
};

export const getDoctors = async () => {
  const doctors = Doctors.findAll();
  return doctors;
};
