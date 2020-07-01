package com.project.hms.controllers;

import com.project.hms.db.models.Medicine;
import com.project.hms.db.models.MedicineTracking;
import com.project.hms.db.models.Patient;
import com.project.hms.services.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MedicineController {
    @Autowired
    MedicineService medicineService;

    @RequestMapping(value="/getmedicineslist",method = RequestMethod.POST)
    public List<Medicine> getMedicine() {
        System.out.println("Getting medicine details from medicine table");
        return medicineService.getMedicine();
    }

    @RequestMapping(value="/getmedicine/{med_id}",method = RequestMethod.POST)
    public String getMedicineDetails(@PathVariable Integer med_id) {
        System.out.println("Getting medicine details corresponding to med_id");
        return medicineService.getMedicineDetails(med_id);
    }

    @RequestMapping(value="/insertMedicineTrack",method = RequestMethod.POST)
    public void insertMedicineTrack(@RequestBody MedicineTracking medicineTracking) {
        System.out.println("Insertion in MedicineTracking");
        medicineService.insertMedicineTrack(medicineTracking.getPatient_id(),medicineTracking.getMedicine_id(),medicineTracking.getQuantity_issued());
    }
    @RequestMapping(value="/updateMedicineQty/{med_id}/{qty}",method = RequestMethod.POST)
    public void updateMedicineQty(@PathVariable Integer med_id,@PathVariable Integer qty) {
        System.out.println("Update Quantity in medicine");
        medicineService.updateQuantityAvailable(med_id,qty);
    }

}
