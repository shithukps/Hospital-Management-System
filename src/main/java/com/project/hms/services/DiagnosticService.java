package com.project.hms.services;

import com.project.hms.db.models.Diagnostic;
import com.project.hms.db.repositories.DiagnosticRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiagnosticService {
    @Autowired
    DiagnosticRepository diagnosticRepository;
    public List<Diagnostic> getDiagnosticsList() {
        return diagnosticRepository.getDiagnosticsList();
    }

    public String getDiagnostics(Integer d_id) {
        return diagnosticRepository.getDiagnostics(d_id);
    }

    public void insertDiagnosticsTrack(Integer patient_id, Integer test_id) {
        diagnosticRepository.insertDiagnosticsTrack(patient_id,test_id);
    }
}
