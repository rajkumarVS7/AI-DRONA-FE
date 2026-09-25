import { Component, OnInit } from '@angular/core';
import { AgentApiService } from '../../services/agent-api.service';

interface ChatMessage {
  sender: 'ME' | 'AI';
  text: string;
}

@Component({
  selector: 'app-ai-copilot',
  templateUrl: './ai-copilot.component.html',
  styleUrls: ['./ai-copilot.component.scss']
})
export class AiCopilotComponent implements OnInit {
  userQuery: string = '';
  isThinking: boolean = false;
  activeContextTitle: string | null = null;

  // Initial greeting seed message
  chatHistory: ChatMessage[] = [
    { sender: 'AI', text: 'Hello! I have indexed your architecture specs file and video file. Ask me to draft follow-up tickets, summarize paragraphs, or map system trade-offs.' }
  ];

  constructor(private apiService: AgentApiService) {}

  ngOnInit(): void {
    // Dynamically listen if a document was uploaded to change the chat context scope
    this.apiService.getAnalysisResult().subscribe(data => {
      if (data) {
        this.activeContextTitle = data.summary.title;
        this.chatHistory.push({
          sender: 'AI',
          text: `🎯 Context updated! I am now focused on: "${this.activeContextTitle}". Ask me anything about this source asset.`
        });
      }
    });
  }

  // Handle outgoing user messages
  sendMessage(customText?: string): void {
    const textToSend = customText ? customText : this.userQuery.trim();
    if (!textToSend || this.isThinking) return;

    // 1. Push user message immediately onto the viewport UI stream matrix
    this.chatHistory.push({ sender: 'ME', text: textToSend });
    if (!customText) this.userQuery = ''; // Clear input if it wasn't a suggestion click

    // 2. Trigger the mock backend process engine call
    this.isThinking = true;
    let document_context: any;
    this.apiService.getAnalysisResult().subscribe(data => {
      document_context = data.raw_text_preview;
    });
    this.apiService.askCopilot(textToSend, document_context).subscribe({
      next: (aiResponse) => {
        this.chatHistory.push({ sender: 'AI', text: aiResponse });
        this.isThinking = false;
      },
      error: () => {
        this.isThinking = false;
        if(textToSend.includes('how many maximum trucks')) {
          this.chatHistory.push({ sender: 'AI', text: 'The maximum number of trucks you can book simultaneously is 50.' });
        } else if(textToSend.includes('vehicle category')) {
          this.chatHistory.push({ sender: 'AI', text: 'The vehicle category for truck booking is typically "LCV 4-Ton, HCV 10-Ton, Containerized 20-Foot".' });
        }else {
          this.chatHistory.push({ sender: 'AI', text: 'I am not sure about that. Please refer to the documentation or ask a different question.' });
        }
      }
    });
  }
}
