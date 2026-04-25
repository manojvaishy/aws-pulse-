export type Priority = "critical" | "high" | "normal";
export type Role =
  | "DevOps"
  | "Developer"
  | "Architect"
  | "Data Engineer"
  | "SRE"
  | "ML Engineer"
  | "Security Engineer"
  | "FinOps"
  | "All Roles";
export type Language = "en" | "hi" | "hg";

// ── Role → services mapping (used for smart feed matching) ───────────────────
export const ROLE_SERVICES: Record<string, string[]> = {
  DevOps:             ["ECS", "EKS", "EC2", "CodePipeline", "CodeCommit", "CloudFormation", "CloudWatch", "Systems Manager", "ECR", "CodeDeploy", "Fargate", "CI/CD", "Kubernetes"],
  Developer:          ["Lambda", "API Gateway", "SDK", "Java", "Python", "Node.js", "DynamoDB", "S3", "AppSync", "Cognito", "Amplify", "Boto3"],
  Architect:          ["VPC", "CloudFront", "Route53", "Well-Arch", "Pricing", "CDN", "Networking", "VPC Lattice", "Transit Gateway"],
  "Data Engineer":    ["Redshift", "Glue", "Athena", "Kinesis", "EMR", "Lake Formation", "S3", "RDS", "Aurora", "DynamoDB", "Serverless"],
  SRE:                ["CloudWatch", "X-Ray", "Systems Manager", "Auto Scaling", "ELB", "Route53", "EC2", "ECS", "EKS", "Incident Manager"],
  "ML Engineer":      ["SageMaker", "Bedrock", "Rekognition", "Comprehend", "Textract", "Forecast", "Personalize", "S3", "EC2", "Lambda"],
  "Security Engineer":["IAM", "Security", "MFA", "GuardDuty", "Security Hub", "WAF", "Shield", "KMS", "Secrets Manager", "Inspector"],
  FinOps:             ["Pricing", "Cost Explorer", "Budgets", "Savings Plans", "Reserved Instances", "S3", "EC2", "RDS", "Redshift"],
};

export interface Update {
  id: string;
  title: string;
  date: string;
  timeAgo: string;
  priority: Priority;
  roles: Role[];
  services: string[];
  category: string;
  summary: string;
  summaryHi: string;
  summaryHg: string;
  originalContent: string;
  isRead: boolean;
  isBookmarked: boolean;
  views: number;
  trendPercent?: number;
  actionRequired?: string;
  deadline?: string;
  sourceUrl: string;
}

export const UPDATES: Update[] = [
  {
    id: "ecs-fargate-deprecation",
    title: "AWS ECS Fargate Platform Version 1.3.0 Deprecation Notice",
    date: "April 1, 2026",
    timeAgo: "2 hours ago",
    priority: "critical",
    roles: ["DevOps"],
    services: ["ECS", "Fargate"],
    category: "Deprecation",
    summary:
      "AWS is retiring ECS Fargate platform version 1.3.0 and all earlier versions. All ECS tasks must migrate to platform version 1.4.0 or LATEST before June 30, 2026. Tasks not migrated will fail to launch after this date — causing a full production outage.",
    summaryHi:
      "AWS, ECS Fargate प्लेटफ़ॉर्म वर्शन 1.3.0 और उससे पुराने सभी वर्शन को बंद कर रहा है। सभी ECS टास्क को 30 जून 2026 से पहले वर्शन 1.4.0 या LATEST पर माइग्रेट करना होगा।",
    summaryHg:
      "AWS ECS Fargate platform version 1.3.0 ko retire kar raha hai. June 30, 2026 se pehle apne tasks ko version 1.4.0 ya LATEST pe migrate karo — warna production outage ho sakta hai.",
    originalContent:
      "Amazon ECS is retiring support for Fargate platform version 1.3.0 and all earlier versions. After June 30, 2026, tasks using these platform versions will no longer be able to launch. We recommend that you update your task definitions to use platform version 1.4.0 or LATEST. Platform version 1.4.0 provides improved security, better networking performance, and access to the latest Fargate features including ephemeral storage expansion and task-level CPU and memory metrics.",
    isRead: false,
    isBookmarked: true,
    views: 1247,
    trendPercent: 340,
    actionRequired: "Migrate all ECS task definitions to platform version 1.4.0 or LATEST",
    deadline: "June 30, 2026",
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/03/amazon-ecs-fargate-platform-version-1-3-0-deprecation/",
  },
  {
    id: "codecommit-frozen",
    title: "AWS CodeCommit No Longer Available to New Customers",
    date: "March 31, 2026",
    timeAgo: "1 day ago",
    priority: "critical",
    roles: ["DevOps", "All Roles"],
    services: ["CodeCommit", "CodeCatalyst"],
    category: "Deprecation",
    summary:
      "AWS has frozen CodeCommit to new customers effective immediately. Existing repositories remain accessible, but no new repositories can be created. AWS recommends migrating to CodeCatalyst, GitHub, or GitLab. This follows the June 2024 announcement that CodeCommit would be discontinued.",
    summaryHi:
      "AWS ने CodeCommit को नए ग्राहकों के लिए बंद कर दिया है। मौजूदा repositories अभी भी accessible हैं, लेकिन नई repositories नहीं बनाई जा सकतीं। CodeCatalyst या GitHub पर migrate करें।",
    summaryHg:
      "AWS ne CodeCommit new customers ke liye band kar diya hai. Existing repos accessible hain, lekin naye repos nahi ban sakte. CodeCatalyst ya GitHub pe migrate karo.",
    originalContent:
      "Effective immediately, AWS CodeCommit is no longer available to new customers. Existing customers can continue to use the service as normal. This change is part of AWS's broader strategy to consolidate developer tooling under CodeCatalyst. We recommend that existing CodeCommit customers evaluate migration to AWS CodeCatalyst, which offers enhanced collaboration features, integrated CI/CD, and a unified development experience.",
    isRead: false,
    isBookmarked: false,
    views: 2401,
    trendPercent: 280,
    actionRequired: "Plan migration from CodeCommit to CodeCatalyst or GitHub",
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/07/aws-codecommit-not-available-new-customers/",
  },
  {
    id: "lambda-streaming-ga",
    title: "Lambda Response Streaming Now Generally Available",
    date: "March 30, 2026",
    timeAgo: "2 days ago",
    priority: "high",
    roles: ["Developer"],
    services: ["Lambda"],
    category: "New Feature",
    summary:
      "AWS Lambda now supports response streaming for Node.js 14+ runtimes. This allows progressive responses up to 20MB, improving perceived latency for data-heavy operations like file downloads, AI-generated content, and large API responses.",
    summaryHi:
      "AWS Lambda अब Node.js 14+ रनटाइम के लिए response streaming को सपोर्ट करता है। यह 20MB तक के progressive responses की अनुमति देता है।",
    summaryHg:
      "AWS Lambda ab Node.js 14+ ke liye response streaming support karta hai. 20MB tak ke progressive responses possible hain — AI content aur large APIs ke liye bahut useful.",
    originalContent:
      "AWS Lambda response streaming is now generally available for Node.js 14.x and later managed runtimes. With response streaming, your Lambda function can progressively send response data to the client as it becomes available, rather than waiting for the entire response to be ready. This can significantly improve the time-to-first-byte for your applications. Response streaming supports payloads up to 20 MB.",
    isRead: false,
    isBookmarked: false,
    views: 1847,
    trendPercent: 120,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2023/04/aws-lambda-response-streaming/",
  },
  {
    id: "java-sdk-v1-eol",
    title: "AWS SDK for Java v1 — End of Support December 2025",
    date: "March 29, 2026",
    timeAgo: "3 days ago",
    priority: "critical",
    roles: ["Developer"],
    services: ["SDK", "Java"],
    category: "End of Support",
    summary:
      "AWS SDK for Java v1.x officially reached end-of-support on December 31, 2025. No further security patches or bug fixes will be released. All applications must migrate to AWS SDK for Java v2 immediately to maintain security compliance and access new AWS features.",
    summaryHi:
      "AWS SDK for Java v1.x का support 31 दिसंबर 2025 को समाप्त हो गया। अब कोई security patches नहीं मिलेंगे। तुरंत AWS SDK for Java v2 पर migrate करें।",
    summaryHg:
      "AWS SDK Java v1 ka support December 2025 mein khatam ho gaya. Ab koi security patches nahi milenge. Turant v2 pe migrate karo.",
    originalContent:
      "The AWS SDK for Java version 1 (v1) reached end of support on December 31, 2025. After this date, AWS will no longer provide security patches, bug fixes, or new features for the v1 SDK. Customers using the v1 SDK are strongly encouraged to migrate to the AWS SDK for Java v2, which offers improved performance, better resource management, and support for the latest AWS services and features.",
    isRead: false,
    isBookmarked: true,
    views: 987,
    trendPercent: 95,
    actionRequired: "Migrate all Java applications from SDK v1 to v2 immediately",
    sourceUrl: "https://aws.amazon.com/blogs/developer/the-aws-sdk-for-java-1-x-is-in-maintenance-mode-effective-july-31-2024/",
  },
  {
    id: "eks-129-ga",
    title: "Amazon EKS 1.29 Now Generally Available",
    date: "March 28, 2026",
    timeAgo: "4 days ago",
    priority: "high",
    roles: ["DevOps"],
    services: ["EKS", "Kubernetes"],
    category: "New Release",
    summary:
      "Amazon EKS now supports Kubernetes 1.29 with improved pod scheduling, enhanced security context constraints, and better node autoscaling. EKS 1.25 reaches end of support in 6 months — plan your upgrade path now.",
    summaryHi:
      "Amazon EKS अब Kubernetes 1.29 को support करता है। बेहतर pod scheduling, enhanced security, और node autoscaling के साथ। EKS 1.25 का support 6 महीने में समाप्त होगा।",
    summaryHg:
      "Amazon EKS ab Kubernetes 1.29 support karta hai. Better pod scheduling aur security ke saath. EKS 1.25 ka support 6 mahine mein khatam hoga — abhi upgrade plan karo.",
    originalContent:
      "Amazon Elastic Kubernetes Service (EKS) now supports Kubernetes version 1.29. Kubernetes 1.29 includes improvements to pod scheduling with the sidecar container feature graduating to beta, enhanced security context constraints, and improvements to the Kubernetes node autoscaler. Amazon EKS version 1.25 will reach end of standard support in 6 months.",
    isRead: true,
    isBookmarked: false,
    views: 1203,
    trendPercent: 85,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/01/amazon-eks-kubernetes-version-1-29/",
  },
  {
    id: "data-transfer-cost-reduction",
    title: "AWS Data Transfer Costs Reduced by Up to 43%",
    date: "March 27, 2026",
    timeAgo: "5 days ago",
    priority: "high",
    roles: ["All Roles"],
    services: ["EC2", "S3", "RDS", "Pricing"],
    category: "Pricing",
    summary:
      "AWS reduced data transfer costs by up to 43% for traffic between AWS services in the same region. This affects EC2, S3, RDS, and most other services. Review your architecture for immediate cost savings — no action required, savings apply automatically.",
    summaryHi:
      "AWS ने same region में AWS services के बीच data transfer costs को 43% तक कम किया है। EC2, S3, RDS सभी affected हैं। कोई action नहीं चाहिए — savings automatically apply होंगी।",
    summaryHg:
      "AWS ne same region mein data transfer costs 43% tak kam kar diye hain. EC2, S3, RDS sab affected hain. Koi action nahi chahiye — savings automatic hain.",
    originalContent:
      "AWS is reducing data transfer pricing for traffic between AWS services within the same AWS Region by up to 43%. This pricing change applies to Amazon EC2, Amazon S3, Amazon RDS, Amazon ElastiCache, Amazon Redshift, and other services. The new pricing is effective immediately and will be reflected in your next billing cycle.",
    isRead: false,
    isBookmarked: true,
    views: 876,
    trendPercent: 60,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/03/aws-data-transfer-price-reduction/",
  },
  {
    id: "lambda-python-312",
    title: "Lambda Python 3.12 Runtime Now Available",
    date: "March 26, 2026",
    timeAgo: "6 days ago",
    priority: "normal",
    roles: ["Developer"],
    services: ["Lambda", "Python"],
    category: "Runtime Update",
    summary:
      "AWS Lambda now supports Python 3.12 runtime with 15% performance improvement over Python 3.11. Python 3.8 runtime will be deprecated in October 2026 — start planning your migration now.",
    summaryHi:
      "AWS Lambda अब Python 3.12 runtime को support करता है। Python 3.11 की तुलना में 15% बेहतर performance। Python 3.8 अक्टूबर 2026 में deprecated होगा।",
    summaryHg:
      "Lambda ab Python 3.12 support karta hai — 15% better performance. Python 3.8 October 2026 mein deprecated hoga, abhi se plan karo.",
    originalContent:
      "AWS Lambda now supports Python 3.12 as a managed runtime. Python 3.12 includes performance improvements, better error messages, and new language features. Functions using Python 3.12 show approximately 15% improvement in cold start times compared to Python 3.11. Note that Python 3.8 runtime will reach end of support in October 2026.",
    isRead: true,
    isBookmarked: false,
    views: 654,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2023/11/aws-lambda-python-3-12/",
  },
  {
    id: "redshift-serverless-price-cut",
    title: "Amazon Redshift Serverless Price Reduction — 26% Lower",
    date: "March 25, 2026",
    timeAgo: "7 days ago",
    priority: "high",
    roles: ["Data Engineer"],
    services: ["Redshift", "Serverless"],
    category: "Pricing",
    summary:
      "AWS reduced Redshift Serverless RPU pricing by 26% across all regions. Existing workloads will automatically benefit from lower costs. No configuration changes required — check your next billing cycle for savings.",
    summaryHi:
      "AWS ने Redshift Serverless RPU pricing को सभी regions में 26% कम किया है। मौजूदा workloads को automatically कम costs का फायदा मिलेगा।",
    summaryHg:
      "Redshift Serverless RPU pricing 26% kam ho gayi hai. Existing workloads ko automatically savings milegi — koi config change nahi chahiye.",
    originalContent:
      "AWS is reducing the price of Amazon Redshift Serverless by 26% across all AWS Regions. The new pricing applies to Redshift Processing Units (RPUs) used for compute. This price reduction applies automatically to all existing and new Redshift Serverless workgroups. There is no action required to take advantage of the new pricing.",
    isRead: false,
    isBookmarked: false,
    views: 543,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2023/11/amazon-redshift-serverless-price-reduction/",
  },
  {
    id: "cloudwatch-logs-insights",
    title: "CloudWatch Logs Insights — 12 New Query Functions",
    date: "March 24, 2026",
    timeAgo: "8 days ago",
    priority: "normal",
    roles: ["DevOps"],
    services: ["CloudWatch", "Logs Insights"],
    category: "New Feature",
    summary:
      "CloudWatch Logs Insights adds 12 new query functions including datetime parsing, IP address analysis, and improved regex support. These additions make it significantly easier to analyze complex log patterns without exporting to external tools.",
    summaryHi:
      "CloudWatch Logs Insights में 12 नए query functions जोड़े गए हैं। Datetime parsing, IP address analysis, और बेहतर regex support शामिल हैं।",
    summaryHg:
      "CloudWatch Logs Insights mein 12 naye query functions aaye hain — datetime parsing, IP analysis, aur better regex. Complex logs analyze karna ab aasaan ho gaya.",
    originalContent:
      "Amazon CloudWatch Logs Insights now supports 12 new built-in query functions. New functions include datetime parsing functions (datefloor, dateceil), network analysis functions (isIpv4InSubnet, isIpv6), and enhanced string manipulation functions. These additions enable more sophisticated log analysis directly within CloudWatch without requiring data export.",
    isRead: true,
    isBookmarked: false,
    views: 421,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2023/11/amazon-cloudwatch-logs-insights-new-query-functions/",
  },
  {
    id: "iam-mandatory-mfa",
    title: "AWS IAM — Mandatory MFA for Root Accounts Starting May 2026",
    date: "March 23, 2026",
    timeAgo: "9 days ago",
    priority: "critical",
    roles: ["All Roles"],
    services: ["IAM", "Security", "MFA"],
    category: "Security",
    summary:
      "AWS will enforce mandatory MFA for all root account logins starting May 2026. Accounts without MFA enabled will be locked out. Enable MFA immediately from your AWS account security settings to avoid disruption.",
    summaryHi:
      "AWS मई 2026 से सभी root account logins के लिए mandatory MFA लागू करेगा। MFA के बिना accounts lock हो जाएंगे। अभी अपने account security settings से MFA enable करें।",
    summaryHg:
      "AWS May 2026 se root accounts ke liye MFA mandatory kar raha hai. MFA nahi hai toh account lock ho jayega. Abhi enable karo.",
    originalContent:
      "Starting in May 2026, AWS will require multi-factor authentication (MFA) for all AWS account root user sign-ins. If MFA is not enabled on your root account before this date, you will be required to enable it before you can sign in. We strongly recommend enabling MFA on your root account immediately. You can enable MFA from the Security credentials section of the AWS Management Console.",
    isRead: false,
    isBookmarked: false,
    views: 1456,
    trendPercent: 210,
    actionRequired: "Enable MFA on all AWS root accounts immediately",
    deadline: "May 2026",
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/06/aws-identity-access-management-mandatory-mfa/",
  },
  {
    id: "s3-lifecycle-policy-update",
    title: "Amazon S3 Lifecycle Policy — New Transition Actions for Intelligent-Tiering",
    date: "March 22, 2026",
    timeAgo: "10 days ago",
    priority: "normal",
    roles: ["Data Engineer", "Architect"],
    services: ["S3", "Intelligent-Tiering"],
    category: "New Feature",
    summary:
      "Amazon S3 now supports direct lifecycle transitions to S3 Intelligent-Tiering from any storage class. Previously, objects had to pass through S3 Standard first. This simplifies cost optimization for unpredictable access patterns.",
    summaryHi:
      "Amazon S3 अब किसी भी storage class से S3 Intelligent-Tiering में direct lifecycle transitions को support करता है। यह unpredictable access patterns के लिए cost optimization को आसान बनाता है।",
    summaryHg:
      "S3 ab kisi bhi storage class se directly Intelligent-Tiering mein transition kar sakta hai. Pehle Standard se guzarna padta tha — ab seedha jump karo aur cost bachao.",
    originalContent:
      "Amazon S3 lifecycle policies now support direct transitions to S3 Intelligent-Tiering from S3 Standard-IA, S3 One Zone-IA, and S3 Glacier Instant Retrieval. This enhancement eliminates the need to transition objects through S3 Standard before moving to Intelligent-Tiering, simplifying lifecycle policy configuration and reducing storage costs for workloads with unpredictable access patterns.",
    isRead: false,
    isBookmarked: false,
    views: 389,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/02/amazon-s3-lifecycle-policies-direct-transitions-intelligent-tiering/",
  },
  {
    id: "rds-aurora-mysql-80",
    title: "Amazon RDS Aurora MySQL 8.0 — Performance Insights Enhanced",
    date: "March 21, 2026",
    timeAgo: "11 days ago",
    priority: "high",
    roles: ["Data Engineer", "Developer"],
    services: ["RDS", "Aurora", "MySQL"],
    category: "Performance",
    summary:
      "Amazon Aurora MySQL 8.0 now includes enhanced Performance Insights with per-query execution plans, wait event analysis, and automatic anomaly detection. Identify slow queries 3x faster than before.",
    summaryHi:
      "Amazon Aurora MySQL 8.0 में enhanced Performance Insights आया है। Per-query execution plans, wait event analysis, और automatic anomaly detection के साथ slow queries को 3x तेज़ identify करें।",
    summaryHg:
      "Aurora MySQL 8.0 mein Performance Insights upgrade hua hai. Ab per-query execution plans aur automatic anomaly detection milega — slow queries 3x faster pakad sakte ho.",
    originalContent:
      "Amazon Aurora MySQL-Compatible Edition 8.0 now offers enhanced Performance Insights capabilities including per-query execution plan visualization, detailed wait event analysis, and machine learning-based anomaly detection. These features help database administrators identify and resolve performance bottlenecks significantly faster. Enhanced Performance Insights is available at no additional cost for Aurora MySQL 8.0 instances.",
    isRead: false,
    isBookmarked: false,
    views: 612,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/01/amazon-aurora-mysql-performance-insights/",
  },
  {
    id: "cloudfront-pricing-update",
    title: "Amazon CloudFront — Price Reduction Across All Edge Locations",
    date: "March 20, 2026",
    timeAgo: "12 days ago",
    priority: "high",
    roles: ["All Roles", "Architect"],
    services: ["CloudFront", "CDN", "Pricing"],
    category: "Pricing",
    summary:
      "AWS reduced CloudFront data transfer pricing by up to 30% across all edge locations globally. HTTP request pricing also reduced by 25%. Changes apply automatically — no configuration needed.",
    summaryHi:
      "AWS ने CloudFront data transfer pricing को globally सभी edge locations पर 30% तक कम किया है। HTTP request pricing भी 25% कम हुई है। Changes automatically apply होंगे।",
    summaryHg:
      "CloudFront pricing 30% tak kam ho gayi hai — globally sab edge locations pe. HTTP requests bhi 25% saste. Koi config change nahi chahiye, savings automatic hain.",
    originalContent:
      "Amazon CloudFront is reducing data transfer out pricing by up to 30% and HTTP request pricing by 25% across all AWS edge locations worldwide. This price reduction applies to all CloudFront distributions automatically. The new pricing is effective immediately and will be reflected in your next AWS bill. This change makes CloudFront one of the most cost-effective CDN solutions available.",
    isRead: true,
    isBookmarked: false,
    views: 934,
    trendPercent: 45,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/03/amazon-cloudfront-price-reduction/",
  },
  {
    id: "dynamodb-auto-scaling-update",
    title: "DynamoDB Auto Scaling — Instant Scaling Without Warm-Up Period",
    date: "March 19, 2026",
    timeAgo: "13 days ago",
    priority: "high",
    roles: ["Developer", "Data Engineer"],
    services: ["DynamoDB", "Auto Scaling"],
    category: "Performance",
    summary:
      "Amazon DynamoDB auto scaling now responds to traffic spikes instantly without a warm-up period. Previously, scaling could take 5–10 minutes. This eliminates throttling during sudden traffic bursts for production workloads.",
    summaryHi:
      "Amazon DynamoDB auto scaling अब traffic spikes पर बिना warm-up period के instantly respond करता है। पहले scaling में 5-10 मिनट लगते थे। अब sudden traffic bursts में throttling नहीं होगी।",
    summaryHg:
      "DynamoDB auto scaling ab instant hai — koi warm-up period nahi. Pehle 5-10 minute lagte the scale hone mein. Ab sudden traffic spike pe bhi throttling nahi hogi.",
    originalContent:
      "Amazon DynamoDB auto scaling now provides instant scaling capabilities, eliminating the previous warm-up period that could take 5 to 10 minutes. When your application experiences sudden traffic spikes, DynamoDB will immediately provision additional capacity without any delay. This improvement significantly reduces the risk of throttling during unexpected traffic bursts and improves application reliability for production workloads.",
    isRead: false,
    isBookmarked: false,
    views: 778,
    trendPercent: 55,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/02/amazon-dynamodb-instant-auto-scaling/",
  },
  {
    id: "lambda-nodejs-20-runtime",
    title: "AWS Lambda Node.js 20 Runtime Now Available — Node.js 16 Deprecated",
    date: "March 18, 2026",
    timeAgo: "14 days ago",
    priority: "critical",
    roles: ["Developer"],
    services: ["Lambda", "Node.js"],
    category: "Runtime Update",
    summary:
      "AWS Lambda now supports Node.js 20 (LTS) runtime. Node.js 16 runtime reaches end of support on June 12, 2026 — all functions must migrate before this date or they will be blocked from updates and new deployments.",
    summaryHi:
      "AWS Lambda अब Node.js 20 (LTS) runtime को support करता है। Node.js 16 runtime का support 12 जून 2026 को समाप्त होगा — सभी functions को migrate करना होगा।",
    summaryHg:
      "Lambda pe Node.js 20 aa gaya hai. Node.js 16 ka support June 12, 2026 ko khatam hoga — migrate nahi kiya toh new deployments block ho jayenge.",
    originalContent:
      "AWS Lambda now supports Node.js 20.x as a managed runtime. Node.js 20 is the current LTS release and includes performance improvements, enhanced security features, and new JavaScript language capabilities. Node.js 16.x runtime will reach end of support on June 12, 2026. After this date, you will no longer be able to create or update Lambda functions using the Node.js 16 runtime.",
    isRead: false,
    isBookmarked: false,
    views: 1123,
    trendPercent: 180,
    actionRequired: "Migrate all Lambda functions from Node.js 16 to Node.js 20",
    deadline: "June 12, 2026",
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2023/11/aws-lambda-nodejs-20/",
  },
  {
    id: "codepipeline-v2-default",
    title: "AWS CodePipeline V2 Type Now Default for All New Pipelines",
    date: "March 17, 2026",
    timeAgo: "15 days ago",
    priority: "high",
    roles: ["DevOps"],
    services: ["CodePipeline", "CI/CD"],
    category: "New Feature",
    summary:
      "AWS CodePipeline V2 is now the default pipeline type for all new pipelines. V2 offers execution modes (queued, parallel, superseded), pipeline-level variables, and per-execution billing instead of per-pipeline billing — reducing costs for infrequently run pipelines.",
    summaryHi:
      "AWS CodePipeline V2 अब सभी नए pipelines के लिए default type है। V2 में execution modes, pipeline-level variables, और per-execution billing मिलती है।",
    summaryHg:
      "CodePipeline V2 ab default ho gaya hai. Execution modes, pipeline variables, aur per-execution billing — infrequent pipelines ke liye cost bahut kam hogi.",
    originalContent:
      "AWS CodePipeline V2 pipeline type is now the default for all newly created pipelines. V2 pipelines offer significant improvements over V1 including three execution modes (QUEUED, PARALLEL, SUPERSEDED), pipeline-level variables that can be passed at execution time, and a new billing model that charges per pipeline execution rather than per active pipeline per month. Existing V1 pipelines continue to work without changes.",
    isRead: true,
    isBookmarked: false,
    views: 567,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/03/aws-codepipeline-v2-default/",
  },
  {
    id: "eks-125-end-of-support",
    title: "Amazon EKS 1.25 Reaches End of Support — Upgrade Required",
    date: "March 16, 2026",
    timeAgo: "16 days ago",
    priority: "critical",
    roles: ["DevOps"],
    services: ["EKS", "Kubernetes"],
    category: "End of Support",
    summary:
      "Amazon EKS Kubernetes version 1.25 reaches end of standard support on May 1, 2026. Clusters on 1.25 will be auto-upgraded to 1.26 by AWS after this date. Plan your upgrade to 1.29 now to avoid forced upgrades.",
    summaryHi:
      "Amazon EKS Kubernetes version 1.25 का standard support 1 मई 2026 को समाप्त होगा। इस date के बाद AWS automatically 1.26 पर upgrade कर देगा। अभी 1.29 पर upgrade plan करें।",
    summaryHg:
      "EKS 1.25 ka support May 1, 2026 ko khatam hoga. AWS automatically 1.26 pe upgrade kar dega — forced upgrade se bachne ke liye abhi 1.29 pe upgrade karo.",
    originalContent:
      "Amazon EKS Kubernetes version 1.25 will reach end of standard support on May 1, 2026. After this date, clusters running Kubernetes 1.25 will be automatically updated to version 1.26 by Amazon EKS. We strongly recommend that you upgrade your clusters to a supported version before the end of support date to avoid unexpected automatic upgrades. Amazon EKS currently supports Kubernetes versions 1.26 through 1.29.",
    isRead: false,
    isBookmarked: true,
    views: 891,
    trendPercent: 120,
    actionRequired: "Upgrade EKS clusters from 1.25 to 1.29 before May 1, 2026",
    deadline: "May 1, 2026",
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/01/amazon-eks-kubernetes-1-25-end-support/",
  },
  {
    id: "aws-sdk-python-boto3-update",
    title: "AWS SDK for Python (Boto3) — Breaking Change in S3 Client",
    date: "March 15, 2026",
    timeAgo: "17 days ago",
    priority: "high",
    roles: ["Developer", "Data Engineer"],
    services: ["SDK", "Python", "S3", "Boto3"],
    category: "Breaking Change",
    summary:
      "Boto3 1.35+ introduces a breaking change in S3 client: the default checksum behavior for PutObject and UploadPart operations has changed. Applications using custom checksum logic may see unexpected errors. Update your code before upgrading Boto3.",
    summaryHi:
      "Boto3 1.35+ में S3 client में breaking change है। PutObject और UploadPart operations के लिए default checksum behavior बदल गया है। Boto3 upgrade करने से पहले अपना code update करें।",
    summaryHg:
      "Boto3 1.35+ mein S3 client ka checksum behavior badal gaya hai. PutObject aur UploadPart use karte ho toh Boto3 upgrade se pehle code check karo — unexpected errors aa sakte hain.",
    originalContent:
      "Starting with Boto3 version 1.35.0, the default checksum behavior for Amazon S3 PutObject and UploadPart API operations has changed. By default, Boto3 will now calculate and send a CRC32 checksum for these operations. If your application provides its own checksum or relies on the previous default behavior, you may encounter errors after upgrading. Review the Boto3 migration guide for details on how to update your code.",
    isRead: false,
    isBookmarked: false,
    views: 743,
    trendPercent: 90,
    actionRequired: "Review S3 PutObject/UploadPart code before upgrading Boto3 to 1.35+",
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/08/boto3-s3-checksum-default/",
  },
  {
    id: "vpc-lattice-ga",
    title: "Amazon VPC Lattice Now Generally Available — Service-to-Service Networking",
    date: "March 14, 2026",
    timeAgo: "18 days ago",
    priority: "normal",
    roles: ["Architect", "DevOps"],
    services: ["VPC", "VPC Lattice", "Networking"],
    category: "New Service",
    summary:
      "Amazon VPC Lattice is now generally available. It provides a fully managed application networking layer for service-to-service communication across VPCs and accounts, with built-in auth, observability, and traffic management — without managing load balancers or service meshes.",
    summaryHi:
      "Amazon VPC Lattice अब generally available है। यह VPCs और accounts में service-to-service communication के लिए fully managed application networking layer provide करता है।",
    summaryHg:
      "VPC Lattice GA ho gaya hai. Service-to-service networking ab bahut aasaan — load balancers ya service mesh manage karne ki zaroorat nahi. Built-in auth aur observability ke saath.",
    originalContent:
      "Amazon VPC Lattice is now generally available. VPC Lattice is a fully managed application networking service that simplifies service-to-service connectivity, security, and monitoring across multiple VPCs and AWS accounts. With VPC Lattice, you can define policies for network access, traffic management, and monitoring to connect compute services in a simplified and consistent manner without managing load balancers, service meshes, or complex VPC peering configurations.",
    isRead: false,
    isBookmarked: false,
    views: 445,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2023/11/amazon-vpc-lattice-generally-available/",
  },

  // ── SRE Updates ──────────────────────────────────────────────────────────────
  {
    id: "cloudwatch-incident-manager-update",
    title: "AWS Incident Manager — Auto-Runbooks Now Support Lambda Actions",
    date: "April 2, 2026",
    timeAgo: "1 hour ago",
    priority: "high",
    roles: ["SRE", "DevOps"],
    services: ["Incident Manager", "CloudWatch", "Lambda"],
    category: "New Feature",
    summary:
      "AWS Incident Manager now supports automated runbooks that trigger Lambda functions directly during incident response. This reduces MTTR by automating common remediation steps like restarting services, scaling resources, or notifying on-call teams.",
    summaryHi:
      "AWS Incident Manager अब automated runbooks को support करता है जो incident response के दौरान Lambda functions को directly trigger करते हैं। इससे MTTR कम होता है।",
    summaryHg:
      "Incident Manager ab Lambda-based auto-runbooks support karta hai. Incident ke time automatic remediation — service restart, scaling, on-call notification sab automatic.",
    originalContent:
      "AWS Systems Manager Incident Manager now supports automated runbooks that can invoke AWS Lambda functions as part of incident response workflows. This enhancement allows SRE teams to automate common remediation actions such as service restarts, capacity scaling, cache invalidation, and automated notifications to on-call engineers.",
    isRead: false,
    isBookmarked: false,
    views: 634,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/02/aws-systems-manager-incident-manager-lambda/",
  },
  {
    id: "xray-distributed-tracing-update",
    title: "AWS X-Ray — Cross-Account Distributed Tracing Now GA",
    date: "April 1, 2026",
    timeAgo: "3 hours ago",
    priority: "high",
    roles: ["SRE", "Developer"],
    services: ["X-Ray", "CloudWatch"],
    category: "New Feature",
    summary:
      "AWS X-Ray now supports cross-account distributed tracing, allowing SRE teams to trace requests across multiple AWS accounts in a single view. Critical for microservices architectures spanning dev, staging, and production accounts.",
    summaryHi:
      "AWS X-Ray अब cross-account distributed tracing को support करता है। Multiple AWS accounts में requests को एक single view में trace करें।",
    summaryHg:
      "X-Ray ab cross-account tracing support karta hai. Multiple accounts mein requests ek hi view mein trace karo — microservices debugging ab bahut aasaan.",
    originalContent:
      "AWS X-Ray now supports cross-account distributed tracing in a generally available release. Teams can now trace requests that span multiple AWS accounts, providing end-to-end visibility into distributed applications. This is particularly valuable for organizations using separate AWS accounts for different environments or microservices.",
    isRead: false,
    isBookmarked: false,
    views: 521,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/03/aws-x-ray-cross-account-tracing/",
  },

  // ── ML Engineer Updates ───────────────────────────────────────────────────────
  {
    id: "bedrock-claude-3-available",
    title: "Amazon Bedrock — Claude 3 Opus, Sonnet & Haiku Now Available",
    date: "April 2, 2026",
    timeAgo: "30 minutes ago",
    priority: "critical",
    roles: ["ML Engineer", "Developer"],
    services: ["Bedrock", "Claude"],
    category: "New Model",
    summary:
      "Anthropic's Claude 3 model family (Opus, Sonnet, Haiku) is now available on Amazon Bedrock. Claude 3 Opus outperforms GPT-4 on most benchmarks. Haiku is the fastest and most cost-effective option for real-time applications.",
    summaryHi:
      "Anthropic का Claude 3 model family (Opus, Sonnet, Haiku) अब Amazon Bedrock पर available है। Claude 3 Opus GPT-4 को most benchmarks पर outperform करता है।",
    summaryHg:
      "Claude 3 family ab Bedrock pe available hai. Opus GPT-4 se better hai benchmarks mein. Haiku fastest aur cheapest hai real-time apps ke liye.",
    originalContent:
      "Amazon Bedrock now offers Anthropic's Claude 3 model family including Claude 3 Opus, Claude 3 Sonnet, and Claude 3 Haiku. Claude 3 Opus demonstrates superior performance on complex reasoning, analysis, and coding tasks. Claude 3 Haiku provides the fastest response times at the lowest cost, making it ideal for customer-facing applications requiring real-time responses.",
    isRead: false,
    isBookmarked: false,
    views: 3241,
    trendPercent: 520,
    actionRequired: "Evaluate Claude 3 models for your AI workloads on Bedrock",
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/03/anthropic-claude-3-amazon-bedrock/",
  },
  {
    id: "sagemaker-canvas-update",
    title: "Amazon SageMaker Canvas — No-Code ML Now Supports Time Series Forecasting",
    date: "March 30, 2026",
    timeAgo: "2 days ago",
    priority: "high",
    roles: ["ML Engineer", "Data Engineer"],
    services: ["SageMaker", "Canvas"],
    category: "New Feature",
    summary:
      "Amazon SageMaker Canvas now supports time series forecasting without writing any code. Business analysts can build accurate demand forecasting, inventory planning, and financial projection models using a visual drag-and-drop interface.",
    summaryHi:
      "Amazon SageMaker Canvas अब बिना code लिखे time series forecasting को support करता है। Business analysts visual interface से demand forecasting models बना सकते हैं।",
    summaryHg:
      "SageMaker Canvas mein no-code time series forecasting aa gaya. Demand forecasting, inventory planning — sab bina code ke. Business analysts ke liye game changer.",
    originalContent:
      "Amazon SageMaker Canvas now includes time series forecasting capabilities that require no machine learning expertise or coding. Users can import historical data, configure forecasting parameters through a visual interface, and generate accurate predictions for demand planning, financial forecasting, and inventory optimization.",
    isRead: false,
    isBookmarked: false,
    views: 892,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/02/amazon-sagemaker-canvas-time-series/",
  },

  // ── Security Engineer Updates ─────────────────────────────────────────────────
  {
    id: "guardduty-malware-protection",
    title: "Amazon GuardDuty — Malware Protection for S3 Now Generally Available",
    date: "April 1, 2026",
    timeAgo: "4 hours ago",
    priority: "critical",
    roles: ["Security Engineer", "DevOps"],
    services: ["GuardDuty", "S3", "Security"],
    category: "Security",
    summary:
      "Amazon GuardDuty Malware Protection for S3 is now GA. It automatically scans newly uploaded S3 objects for malware and threats. Critical for organizations storing user-uploaded content, preventing malware propagation through S3 buckets.",
    summaryHi:
      "Amazon GuardDuty Malware Protection for S3 अब GA है। यह S3 में नए upload किए गए objects को automatically malware के लिए scan करता है।",
    summaryHg:
      "GuardDuty ab S3 objects ko automatically malware ke liye scan karta hai. User-uploaded content store karne wale orgs ke liye critical — malware propagation rokta hai.",
    originalContent:
      "Amazon GuardDuty Malware Protection for Amazon S3 is now generally available. This feature automatically scans S3 objects when they are uploaded, detecting malware, trojans, ransomware, and other threats before they can propagate through your systems. The service integrates with S3 Event Notifications and can automatically quarantine infected objects.",
    isRead: false,
    isBookmarked: false,
    views: 1876,
    trendPercent: 290,
    actionRequired: "Enable GuardDuty Malware Protection on S3 buckets storing user content",
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/03/amazon-guardduty-malware-protection-s3/",
  },
  {
    id: "iam-identity-center-update",
    title: "AWS IAM Identity Center — Trusted Token Issuer for External IdPs",
    date: "March 28, 2026",
    timeAgo: "4 days ago",
    priority: "high",
    roles: ["Security Engineer", "Architect"],
    services: ["IAM", "Identity Center", "Security"],
    category: "New Feature",
    summary:
      "AWS IAM Identity Center now supports Trusted Token Issuers, allowing organizations to use tokens from external identity providers (Okta, Azure AD, Ping) to access AWS resources without federation setup. Simplifies zero-trust architecture implementation.",
    summaryHi:
      "AWS IAM Identity Center अब Trusted Token Issuers को support करता है। External identity providers (Okta, Azure AD) के tokens से AWS resources access करें।",
    summaryHg:
      "IAM Identity Center mein Trusted Token Issuers aa gaya. Okta, Azure AD ke tokens se directly AWS access karo — federation setup ki zaroorat nahi. Zero-trust easy ho gaya.",
    originalContent:
      "AWS IAM Identity Center now supports Trusted Token Issuers, enabling organizations to configure external identity providers as trusted sources of authentication tokens. This allows users authenticated by Okta, Azure Active Directory, Ping Identity, or other OIDC-compliant providers to access AWS resources using their existing corporate credentials.",
    isRead: false,
    isBookmarked: false,
    views: 743,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/02/aws-iam-identity-center-trusted-token-issuer/",
  },

  // ── FinOps Updates ────────────────────────────────────────────────────────────
  {
    id: "cost-explorer-anomaly-detection",
    title: "AWS Cost Anomaly Detection — AI-Powered Alerts Now Include Root Cause",
    date: "April 2, 2026",
    timeAgo: "2 hours ago",
    priority: "high",
    roles: ["FinOps", "Architect"],
    services: ["Cost Explorer", "Budgets", "Pricing"],
    category: "New Feature",
    summary:
      "AWS Cost Anomaly Detection now includes AI-powered root cause analysis. When a cost spike is detected, the system automatically identifies the specific service, region, usage type, and linked account responsible — reducing investigation time from hours to minutes.",
    summaryHi:
      "AWS Cost Anomaly Detection अब AI-powered root cause analysis include करता है। Cost spike detect होने पर system automatically responsible service, region identify करता है।",
    summaryHg:
      "Cost Anomaly Detection mein AI root cause analysis aa gaya. Cost spike aane pe automatically pata chalta hai ki kaunsi service, region, account responsible hai — investigation minutes mein.",
    originalContent:
      "AWS Cost Anomaly Detection now provides AI-powered root cause analysis for detected cost anomalies. When an unusual spending pattern is identified, the service automatically analyzes usage data to pinpoint the specific AWS service, region, usage type, and linked account contributing to the anomaly. This enhancement significantly reduces the time required to investigate and resolve unexpected cost increases.",
    isRead: false,
    isBookmarked: false,
    views: 1123,
    trendPercent: 145,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/03/aws-cost-anomaly-detection-root-cause/",
  },
  {
    id: "savings-plans-compute-update",
    title: "AWS Compute Savings Plans — Now Cover Amazon EKS and Fargate Spot",
    date: "March 25, 2026",
    timeAgo: "7 days ago",
    priority: "high",
    roles: ["FinOps", "DevOps"],
    services: ["Savings Plans", "EKS", "Fargate", "Pricing"],
    category: "Pricing",
    summary:
      "AWS Compute Savings Plans now cover Amazon EKS on Fargate and Fargate Spot workloads. Organizations running containerized workloads can now save up to 66% compared to on-demand pricing by committing to a consistent compute spend.",
    summaryHi:
      "AWS Compute Savings Plans अब Amazon EKS on Fargate और Fargate Spot workloads को cover करते हैं। Containerized workloads पर on-demand pricing की तुलना में 66% तक बचत करें।",
    summaryHg:
      "Compute Savings Plans ab EKS on Fargate aur Fargate Spot ko cover karta hai. Container workloads pe 66% tak savings — on-demand se compare karke.",
    originalContent:
      "AWS Compute Savings Plans now include coverage for Amazon EKS workloads running on AWS Fargate and Fargate Spot. This expansion allows organizations with containerized applications to benefit from Savings Plans discounts of up to 66% compared to on-demand pricing, while maintaining the flexibility to change instance types, regions, and operating systems.",
    isRead: false,
    isBookmarked: false,
    views: 678,
    sourceUrl: "https://aws.amazon.com/about-aws/whats-new/2024/02/aws-compute-savings-plans-eks-fargate/",
  },
];

export const USER = {
  name: "Rahul Sharma",
  initials: "RS",
  email: "rahul.sharma@techcorp.in",
  company: "TechCorp India Pvt. Ltd.",
  designation: "Senior DevOps Engineer",
  location: "Pune, Maharashtra, India",
  joinedDate: "January 15, 2026",
  joinedMonth: "January 2026",
  role: "DevOps" as Role,
  language: "en" as Language,
  stats: {
    updatesRead: 847,
    criticalCaught: 23,
    searchesPerformed: 156,
    languageSwitches: 12,
    feedRelevance: 94,
  },
  lastActive: "April 1, 2026 at 2:34 PM",
};

export const ANALYTICS = {
  totalEvents: 12847,
  updatesViewed: 3241,
  searchesPerformed: 847,
  languageSwitches: 234,
  updateSkipped: 8432,
  markedRead: 1847,
  notificationDismissed: 156,
  roleDistribution: [
    { role: "DevOps", percent: 38 },
    { role: "Developer", percent: 31 },
    { role: "Architect", percent: 19 },
    { role: "Data Engineer", percent: 12 },
  ],
};

export const READING_HISTORY = [
  { id: "ecs-fargate-deprecation", title: "AWS ECS Fargate Runtime Deprecation Notice", date: "April 1, 2026", time: "2:30 PM", priority: "critical" as Priority, role: "DevOps" },
  { id: "eks-129-ga", title: "Amazon EKS 1.29 Generally Available", date: "March 31, 2026", time: "11:15 AM", priority: "high" as Priority, role: "DevOps" },
  { id: "cloudwatch-logs-insights", title: "CloudWatch Logs Insights New Query Functions", date: "March 30, 2026", time: "9:45 AM", priority: "normal" as Priority, role: "DevOps" },
  { id: "codepipeline-v2", title: "AWS CodePipeline V2 Type Now Default", date: "March 29, 2026", time: "3:20 PM", priority: "high" as Priority, role: "DevOps" },
  { id: "iam-mandatory-mfa", title: "AWS IAM Mandatory MFA for Root Accounts", date: "March 28, 2026", time: "10:00 AM", priority: "critical" as Priority, role: "All Roles" },
];

export const BOOKMARKS = [
  { id: "ecs-fargate-deprecation", title: "ECS Runtime Deprecation", savedDate: "April 1, 2026", priority: "critical" as Priority, note: "Action required by June 2026" },
  { id: "java-sdk-v1-eol", title: "Java SDK v1 End of Support", savedDate: "March 29, 2026", priority: "critical" as Priority, note: "Migration guide saved" },
  { id: "data-transfer-cost-reduction", title: "AWS Data Transfer Cost Reduction", savedDate: "March 27, 2026", priority: "high" as Priority, note: "Cost savings opportunity" },
];
