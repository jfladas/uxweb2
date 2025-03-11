import { Test, TestingModule } from '@nestjs/testing';
import { GithubStrategyService } from './github.strategy.service';

describe('GithubStrategyService', () => {
  let service: GithubStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubStrategyService],
    }).compile();

    service = module.get<GithubStrategyService>(GithubStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
