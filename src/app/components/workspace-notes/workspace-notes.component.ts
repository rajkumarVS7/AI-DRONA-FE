import { Component, OnInit } from '@angular/core';
import { AgentApiService } from '../../services/agent-api.service';

@Component({
  selector: 'app-workspace-notes',
  templateUrl: './workspace-notes.component.html',
  styleUrls: ['./workspace-notes.component.scss']
})
export class WorkspaceNotesComponent implements OnInit {
  activeNoteData: any = null;

  constructor(private apiService: AgentApiService) {}

  ngOnInit(): void {
    // Listen for incoming dynamic summaries emitted from the Ingestion Service
    this.apiService.getAnalysisResult().subscribe(data => {
      this.activeNoteData = data;
    });
  }
}
