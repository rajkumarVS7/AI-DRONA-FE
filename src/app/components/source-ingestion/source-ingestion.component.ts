import { Component } from '@angular/core';
import { fileMockData } from 'src/app/mock-data/file-mock-data';
import { AgentApiService } from 'src/app/services/agent-api.service';

@Component({
  selector: 'app-source-ingestion',
  templateUrl: './source-ingestion.component.html',
  styleUrls: ['./source-ingestion.component.scss']
})
export class SourceIngestionComponent {

  inputUrl: string = '';
  uploadedFileName: string = '';
  isProcessing: boolean = false;
  errorMessage: string = '';

   constructor(private apiService: AgentApiService) {}

   onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadedFileName = file.name;
      this.errorMessage = '';
      this.isProcessing = true;

      // Execute actual background streaming request to Python
      this.apiService.uploadAndExtractFile(file).subscribe({
        next: (response) => {
          this.apiService.setAnalysisResult(response); // Dispatches data to workspace notes panel
          this.isProcessing = false;
        },
        error: (err) => {
          console.error(err);
         // this.errorMessage = err.error?.detail || 'Network connection to FastAPI server failed.';
          this.isProcessing = false;
          this.apiService.setAnalysisResult(fileMockData); // Clear any previous analysis result
        }
      });
    }
  }

   onUrlSubmit(): void {
    if (this.inputUrl.trim()) {
      this.triggerAnalysis(this.inputUrl, 'url');
    }
  }

  private triggerAnalysis(name: string, type: 'file' | 'url'): void {
    this.isProcessing = true;
    this.apiService.analyzeSource(name,).subscribe({
      next: (response) => {
        this.apiService.setAnalysisResult(response); // Broadcast result to other components
        this.isProcessing = false;
        this.inputUrl = ''; // Clear text field
      },
      error: () => {
        this.isProcessing = false;
      }
    });
  }
}
