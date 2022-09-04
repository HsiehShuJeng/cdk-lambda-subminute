const projen = require('projen');

const project = new projen.awscdk.AwsCdkConstructLibrary({
  author: 'scott.hsieh',
  authorName: 'Shu-Jeng Hsieh',
  authorAddress: 'https://fantasticsie.medium.com/',
  keywords: [
    'aws-step-functions',
    'aws-lambda', 'projen',
    'aws-cloudwatch-events',
    'serverless',
    'scott.hsieh',
  ],
  description: 'A construct for deploying a Lambda function that can be invoked every time unit less than one minute.',
  cdkVersion: '2.27.0',
  majorVersion: 2,
  defaultReleaseBranch: 'main',
  name: 'cdk-lambda-subminute',
  repositoryUrl: 'https://github.com/HsiehShuJeng/cdk-lambda-subminute.git',
  deps: [
    'aws-cdk-lib',
    'constructs@^10.0.5',
  ],
  devDeps: [
    'aws-cdk-lib',
    'constructs@^10.0.5',
    'esbuild',
    'source-map-support',
  ],
  peerDeps: [
    'aws-cdk-lib',
    'constructs@^10.0.5',
  ],
  eslint: true,
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['HsiehShuJeng'],
  },

  gitignore: [
    'cdk.out',
    '.cdk.staging',
    // For Mavn GPG
    'public.pem',
    'private.pem',
    // For Python demo
    '*.swp',
    'package-lock.json',
    '__pycache__',
    '.pytest_cache',
    '.env',
    '.venv',
    '*.egg-info',
    // For Java demo
    '.classpath.txt',
    'target/',
    '.classpath',
    '.project',
    '.idea',
    '.settings',
    '.vscode/',
    '*.iml',
  ],
  releaseToNpm: true,
  publishToPypi: {
    distName: 'cdk_lambda_subminute',
    module: 'cdk_lambda_subminute',
  },
  publishToMaven: {
    mavenGroupId: 'io.github.hsiehshujeng',
    mavenArtifactId: 'cdk-lambda-subminute',
    javaPackage: 'io.github.hsiehshujeng.cdk.lambda.subminute',
    mavenEndpoint: 'https://s01.oss.sonatype.org', // check https://central.sonatype.org/publish/release/#login-into-ossrh
  },
  publishToNuget: {
    dotNetNamespace: 'ScottHsieh.Cdk',
    packageId: 'Lambda.Subminute',
  },
  publishToGo: {
    moduleName: 'github.com/HsiehShuJeng/cdk-lambda-subminute-go',
  },
});
project.eslint.addOverride({
  files: ['*.ts'],
  rules: { '@typescript-eslint/no-require-imports': 0 },
});

const commonExclusions = ['cdk.context.json', 'yarn-error.log'];
project.npmignore.exclude(...commonExclusions);
project.gitignore.exclude(...commonExclusions);
project.package.addPackageResolutions('got@12.3.0');

project.synth();