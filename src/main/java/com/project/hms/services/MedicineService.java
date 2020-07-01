package com.project.hms.services;

import com.project.hms.db.models.Medicine;
import com.project.hms.db.repositories.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {
    @Autowired
    MedicineRepository medicineRepository;
    public List<Medicine> getMedicine() {
        return medicineRepository.getMedicines();
    }

    public String getMedicineDetails(Integer med_id) {
        return medicineRepository.getMedicineDetails(med_id);
    }

    public void insertMedicineTrack(Integer patient_id, Integer medicine_id, Integer quantity_issued) {
        medicineRepository.insertMedicineTrack(patient_id,medicine_id,quantity_issued);
    }

    public void updateQuantityAvailable(Integer med_id, Integer qty) {
        medicineRepository.updateQuantityAvailable(med_id,qty);
    }
}
