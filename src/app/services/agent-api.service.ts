import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentApiService {
// Shared state to hold the analysis result across components
  private analysisResult$ = new BehaviorSubject<any>(null);
   // Your local Python FastAPI dev host address target
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {} 

  // Connects directly to upload.py file upload parser endpoint
  uploadAndExtractFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name); // 'file' matches your Python path keyword parameter

    return this.http.post<any>(`${this.baseUrl}/upload-and-extract/`, formData);
  }

   // Setters and Getters for active UI stream data synchronization
  setAnalysisResult(data: any): void {
    this.analysisResult$.next(data);
  }

  getAnalysisResult(): Observable<any> {
    return this.analysisResult$.asObservable();
  }
  // Mock endpoint mimicking the Python Backend API response
  analyzeSource(url: string,): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/extract-video-text/`,{video_url:url}).pipe(
      delay(900), // Simulate network/backend delay
    ).pipe(
      map(response => response)
    );;
  }


   // Mock endpoint mimicking streaming AI chat responses from Python
  askCopilot(question: string, documentContext: string | null): Observable<string> {
    let reply = `I've analyzed your question based on the active session. The system suggests cross-referencing your configuration arrays to ensure proper execution loops.`;

    if (documentContext) {
      reply = `Based on the active source context ("${documentContext}"), your question regarding "${question}" directly maps to our core optimization strategy. I recommend checking your subscription streams to prevent memory overhead leaks.`;
    }

    return this.http.post<{ answer: string }>(`${this.baseUrl}/chat-with-extracted-note/`, {
      document_text: documentContext,
      user_query: question
    }).pipe(
      delay(500), // Simulate network/backend delay
    ).pipe(
      map(response => response.answer)
    );
  }

}
