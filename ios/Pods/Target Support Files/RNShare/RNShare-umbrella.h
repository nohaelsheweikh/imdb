#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "EmailShare.h"
#import "GenericShare.h"
#import "GooglePlusShare.h"
#import "InstagramShare.h"
#import "RNShare.h"
#import "WhatsAppShare.h"

FOUNDATION_EXPORT double RNShareVersionNumber;
FOUNDATION_EXPORT const unsigned char RNShareVersionString[];

