import { generateAIMove } from '../aiLogic';
import { getPossibleWords } from '../dictionary';

// Mock the dictionary module
jest.mock('../dictionary', () => ({
  getPossibleWords: jest.fn(),
}));

describe('generateAIMove', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should return a valid next letter when possible words exist', async () => {
    // Mock the getPossibleWords function to return some sample words
    getPossibleWords.mockResolvedValue(['cat', 'car', 'can']);

    const sequence = 'ca';
    const result = await generateAIMove(sequence);

    expect(result).toMatch(/[trn]/);
    expect(getPossibleWords).toHaveBeenCalledWith(sequence);
  });

  it('should return null when no possible words exist', async () => {
    getPossibleWords.mockResolvedValue([]);

    const sequence = 'xyz';
    const result = await generateAIMove(sequence);

    expect(result).toBeNull();
    expect(getPossibleWords).toHaveBeenCalledWith(sequence);
  });

  it('should return null when possible words exist but have no next letter', async () => {
    getPossibleWords.mockResolvedValue(['cat', 'car', 'can']);

    const sequence = 'cat';
    const result = await generateAIMove(sequence);

    expect(result).toBeNull();
    expect(getPossibleWords).toHaveBeenCalledWith(sequence);
  });

  it('should handle empty sequence', async () => {
    getPossibleWords.mockResolvedValue(['a', 'b', 'c']);

    const sequence = '';
    const result = await generateAIMove(sequence);

    expect(result).toMatch(/[abc]/);
    expect(getPossibleWords).toHaveBeenCalledWith(sequence);
  });
});
