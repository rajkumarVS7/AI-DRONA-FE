import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SourceIngestionComponent } from './components/source-ingestion/source-ingestion.component';
import { WorkspaceNotesComponent } from './components/workspace-notes/workspace-notes.component';
import { AiCopilotComponent } from './components/ai-copilot/ai-copilot.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SourceIngestionComponent,
    WorkspaceNotesComponent,
    AiCopilotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
