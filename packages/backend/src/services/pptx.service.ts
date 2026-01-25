import PptxGenJS from 'pptxgenjs';
import { QuizState } from '@quiz-genny/shared';

export class PptxService {
  async generatePresentation(state: QuizState): Promise<Buffer> {
    const pptx = new PptxGenJS();

    // Define master slide
    pptx.layout = 'LAYOUT_WIDE';

    // Title Slide
    this.addTitleSlide(pptx, state.presentation.title);

    // For each round
    for (let i = 0; i < state.rounds.length; i++) {
      const round = state.rounds[i];
      const sectionName = `Round ${i + 1}`;

      // Round intro slide
      this.addRoundIntroSlide(pptx, i + 1, sectionName);

      // Question slides
      const questions = round.questions.accepted;
      for (let q = 0; q < questions.length; q++) {
        const question = questions[q];

        // Question slide
        this.addQuestionSlide(pptx, q + 1, question.question);

        // Answer slide (based on reveal frequency)
        // For Phase 1, always add answers after questions
        this.addAnswerSlide(pptx, q + 1, question.question, question.answer);
      }
    }

    // Closing slide
    this.addClosingSlide(pptx);

    return (await pptx.write({ outputType: 'nodebuffer' })) as Buffer;
  }

  private addTitleSlide(pptx: PptxGenJS, title: string) {
    const slide = pptx.addSlide();
    slide.background = { color: '4472C4' };

    slide.addText(title, {
      x: 1,
      y: 2.5,
      w: 8,
      h: 1.5,
      fontSize: 48,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
    });

    slide.addText('Quiz Night', {
      x: 1,
      y: 4,
      w: 8,
      h: 0.5,
      fontSize: 24,
      color: 'FFFFFF',
      align: 'center',
    });
  }

  private addRoundIntroSlide(pptx: PptxGenJS, roundNumber: number, roundName: string) {
    const slide = pptx.addSlide();
    slide.background = { color: 'ED7D31' };

    slide.addText(`Round ${roundNumber}`, {
      x: 1,
      y: 2,
      w: 8,
      h: 1,
      fontSize: 44,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
    });

    slide.addText(roundName, {
      x: 1,
      y: 3.2,
      w: 8,
      h: 0.8,
      fontSize: 32,
      color: 'FFFFFF',
      align: 'center',
    });
  }

  private addQuestionSlide(pptx: PptxGenJS, questionNumber: number, question: string) {
    const slide = pptx.addSlide();

    // Question number badge
    slide.addText(`Q${questionNumber}`, {
      x: 0.5,
      y: 0.5,
      w: 1,
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: 'FFFFFF',
      fill: { color: '4472C4' },
      align: 'center',
      valign: 'middle',
    });

    // Question text
    slide.addText(question, {
      x: 0.5,
      y: 2,
      w: 9,
      h: 3,
      fontSize: 32,
      color: '000000',
      align: 'center',
      valign: 'middle',
      wrap: true,
    });
  }

  private addAnswerSlide(
    pptx: PptxGenJS,
    questionNumber: number,
    question: string,
    answer: string
  ) {
    const slide = pptx.addSlide();
    slide.background = { color: 'F2F2F2' };

    // Question number badge
    slide.addText(`Q${questionNumber}`, {
      x: 0.5,
      y: 0.5,
      w: 1,
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: 'FFFFFF',
      fill: { color: '70AD47' },
      align: 'center',
      valign: 'middle',
    });

    // Question text (smaller)
    slide.addText(question, {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 1.5,
      fontSize: 24,
      color: '666666',
      align: 'center',
      valign: 'middle',
      wrap: true,
    });

    // Answer text (prominent)
    slide.addText(answer, {
      x: 1,
      y: 3.5,
      w: 8,
      h: 1.5,
      fontSize: 40,
      bold: true,
      color: '70AD47',
      align: 'center',
      valign: 'middle',
      wrap: true,
    });
  }

  private addClosingSlide(pptx: PptxGenJS) {
    const slide = pptx.addSlide();
    slide.background = { color: '4472C4' };

    slide.addText('Thanks for Playing!', {
      x: 1,
      y: 2.5,
      w: 8,
      h: 1.5,
      fontSize: 48,
      bold: true,
      color: 'FFFFFF',
      align: 'center',
    });

    slide.addText('🎉', {
      x: 1,
      y: 4,
      w: 8,
      h: 1,
      fontSize: 64,
      align: 'center',
    });
  }
}

export const pptxService = new PptxService();
