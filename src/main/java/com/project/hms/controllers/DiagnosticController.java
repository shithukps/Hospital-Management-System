package com.project.hms.controllers;

import com.project.hms.db.models.Diagnostic;
import com.project.hms.db.models.DiagnosticTracking;
import com.project.hms.db.models.Medicine;
import com.project.hms.db.models.MedicineTracking;
import com.project.hms.services.DiagnosticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DiagnosticController {
    @Autowired
    DiagnosticService diagnosticService;

    @RequestMapping(value="/getDiagnosticsList",method = RequestMethod.POST)
    public List<Diagnostic> getDiagnosticsList() {
        System.out.println("Getting diagnostics details from diagnostic table");
        return diagnosticService.getDiagnosticsList();
    }

    @RequestMapping(value="/getDiagnostics/{d_id}",method = RequestMethod.POST)
    public String getDiagnostics(@PathVariable Integer d_id) {
        System.out.println("Getting diagnostic details corresponding to d_id");
        return diagnosticService.getDiagnostics(d_id);
    }

    @RequestMapping(value="/insertDiagnosticsTrack",method = RequestMethod.POST)
    public void insertDiagnosticsTrack(@RequestBody DiagnosticTracking diagnosticTracking) {
        System.out.println("Insertion in DiagnosticTracking");
        diagnosticService.insertDiagnosticsTrack(diagnosticTracking.getPatient_id(),diagnosticTracking.getTest_id());
    }
}
